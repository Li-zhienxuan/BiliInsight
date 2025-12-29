# 华硕笔记本显卡混合模式配置指南

## 目标
- AMD 680M 集成显卡负责显示输出（解决背光调节问题）
- NVIDIA 独立显卡保留用于计算任务（CUDA、游戏等）
- 支持HDMI外接显示器

## 当前状态
- **card0 (NVIDIA)** - 当前负责显示输出 ❌
- **card1 (AMD 680M)** - 未用于显示输出

---

## 第一步：BIOS配置

### 1. 进入BIOS
```
1. 完全关机（不是重启）
2. 按电源键开机，立即不断按 F2 或 Del 键
3. 进入BIOS界面（通常是蓝色或灰色界面）
```

### 2. 找到显卡设置
按优先级查找以下位置：

**方案A**（最常见）：
```
Advanced → System Agent Configuration
    → Graphics Configuration
        → Primary Display: [Auto] ✓
        → iGPU Multi-Monitor: [Enabled] ✓
```

**方案B**：
```
Advanced → Graphics Configuration
    → Primary Display: [Auto] ✓
```

**方案C**：
```
Boot → Graphics Configuration
    → Primary Display: [Auto] ✓
```

**方案D**：
```
Graphics → Primary Display: [Auto] ✓
```

### 3. 关键设置说明
- **选择 Auto**：让系统自动选择AMD作为主显示GPU
- 不要选择 CPU Graphics（完全禁用独显）
- 不要选择 PEG/PCI Express（只用独显）

### 4. 保存退出
- 按 **F10** 保存并退出
- 确认保存（Yes/OK）
- 系统会重启

---

## 第二步：重启后验证

重启进入系统后，运行检查脚本：

```bash
~/check-gpu.sh
```

**期望看到的结果：**
- ✓ OpenGL renderer: AMD Radeon 或 AMD GPU
- ✓ lsmod 中没有 nouveau（或很少使用）
- ✓ amdgpu 模块正常工作
- ✓ 背光设备正常

**如果结果正确：**
- 背光调节键应该正常工作
- HDMI连接显示器后应该正常显示
- 功耗降低、续航增加

---

## 第三步：Linux配置（如需要）

### 检查显卡连接情况

```bash
# 查看provider
xrandr --listproviders

# 查看DRM设备
ls /sys/class/drm/

# 检查HDMI连接状态
cat /sys/class/drm/card?-HDMI-*/status
```

### 如果NVIDIA仍被默认使用

在 `~/.bashrc` 或 `~/.zshrc` 添加：

```bash
# 强制使用AMD GPU进行渲染
export DRI_PRIME=1

# 或者指定GPU
export __GLX_VENDOR_LIBRARY_NAME=amd
```

然后重新加载：
```bash
source ~/.bashrc
# 或
source ~/.zshrc
```

### 连接HDMI显示器

连接HDMI显示器后，检查连接状态：

```bash
# 查看是否检测到
xrandr
```

如果需要配置显示器（如扩展屏幕）：

```bash
# 示例：将HDMI显示器设置为扩展屏
xrandr --output HDMI-A-1 --auto --right-of eDP-1

# 或设置为镜像
xrandr --output HDMI-A-1 --auto --same-as eDP-1
```

---

## 第四步：验证配置

### 测试显示输出
```bash
# 检查当前渲染GPU
glxinfo | grep "OpenGL renderer"

# 应该显示：AMD Radeon 或类似的AMD GPU
```

### 测试HDMI连接
1. 连接HDMI显示器到笔记本
2. 运行 `xrandr` 查看是否检测到
3. 检查显示器是否有显示

### 测试背光调节
- 按键盘亮度调节键
- 亮度应该平滑调节

---

## 常见问题

### Q1: BIOS找不到显卡设置选项？
**解决方法：**
1. 更新BIOS到最新版本
   ```bash
   sudo dmidecode -s bios-version
   sudo dmidecode -s bios-release-date
   ```
2. 查找 "GPU Switch" 或 "Graphics Configuration"
3. 尝试 Windows 下的 Armoury Crate 应用

### Q2: 设置后黑屏无法开机？
**解决方法：**
1. 断电，按住电源键30秒放电
2. 重新开机进BIOS
3. 改回之前的设置

### Q3: HDMI显示器不显示？
**检查步骤：**
```bash
# 1. 确认HDMI连接到哪个GPU
cat /sys/class/drm/card0-HDMI-A-1/status
cat /sys/class/drm/card1-DP-*/status

# 2. 检查是否是AMD card1
# 如果HDMI在card1（AMD），需要确保AMD负责显示

# 3. 手动启用显示器
xrandr --output HDMI-A-1 --auto
```

### Q4: 需要使用NVIDIA做计算怎么办？
**使用PRIME功能：**
```bash
# 在需要NVIDIA计算时运行
DRI_PRIME=1 your_cuda_program

# 或者在Python中
import os
os.environ['DRI_PRIME'] = '1'
```

---

## 技术细节

### 显卡信息
- **AMD 680M (card1)**: Vendor ID 0x1002, Device ID 0x1681
  - HDMI 2.1
  - DisplayPort 1.4
  - 支持多显示器（最多4台）

- **NVIDIA (card0)**: Vendor ID 0x10de, Device ID 0x28e0
  - 用于CUDA、游戏等高性能计算

### 驱动状态
- **amdgpu**: AMD官方驱动（✓ 推荐）
- **nouveau**: NVIDIA开源驱动（仅用于基本显示）
- **nvidia**: NVIDIA专有驱动（需要CUDA时安装）

---

## 配置完成后的好处

✓ 背光调节完美工作
✓ HDMI显示器正常连接和使用
✓ 功耗降低、续航增加
✓ 发热减少、风扇更安静
✓ Linux驱动兼容性更好
✓ NVIDIA保留用于需要高性能的场景

---

## 后续优化建议

### 如果需要NVIDIA专有驱动（CUDA）

```bash
# 安装NVIDIA驱动（注意会与nouveau冲突）
sudo apt install nvidia-driver

# 禁用nouveau
sudo nano /etc/modprobe.d/blacklist-nouveau.conf
# 添加：
# blacklist nouveau
# options nouveau modeset=0

# 更新initramfs
sudo update-initramfs -u

# 重启
```

### 图形性能优化

```bash
# 检查当前GPU使用情况
sudo watch -n 1 cat /sys/kernel/debug/dri/0/amdgpu_pm_info

# 或者使用radeontop
sudo apt install radeontop
sudo radeontop
```

---

**配置日期**: 2025-12-29
**系统**: Linux (Debian/Ubuntu系)
**笔记本**: 华硕 (ASUS)
