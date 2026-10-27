**Languages:** English | [Español](README.es.md)

# abuel-os — Downloads

**Official abuel-os download page**, for a distribution based on Debian 12 (Bookworm) and XFCE, designed to provide a simple desktop and a separate account for the person responsible.

## Latest version: 1.0.2

| Feature | Detail |
|---|---|
| Architecture | AMD64 (64-bit Intel/AMD) |
| Base system | Debian 12 (Bookworm) |
| Desktop | XFCE |
| Boot | BIOS and UEFI; Secure Boot compatibility indicated for this version |
| RAM | 2 GB minimum; 4 GB recommended |
| USB | 4 GB minimum; 8 GB or more recommended |

**Download status:** the ISOs have not yet been published in this repository. When available, they will appear in [Releases](https://github.com/ericsnet/Abuel-os-Downloads/releases).

## Versions and verification

| Version | Expected SHA-256 | Status |
|---|---|---|
| 1.0.2 | `bb0b42ca5f3acd4694263906e296d0b2cac9ab33da4cf6760ce83335551cfb98` | ISO pending publication |
| 1.0.1 | `ff037e08f2ee942806cb92498ae475217ec058db28207dfc2be3490bdb835fc2` | ISO pending publication |
| 1.0.0 | `3262da299e671020aa0268eaf076b7d0756d799d163ff90e1a2b6eec2b22eebf` | ISO pending publication |

Always verify the SHA-256 checksum of the downloaded ISO and compare it with the one for that version. If it does not match exactly, do not use that image.

### Verify on Windows

Open PowerShell and run the following command, changing the path if you saved the ISO in another folder:

```powershell
Get-FileHash "$HOME\Downloads\abuelo-os-amd64.iso" -Algorithm SHA256
```

Compare the `Hash` value with the published SHA-256.

### Verify on Linux

In a terminal open in the ISO folder:

```bash
sha256sum abuelo-os-amd64.iso
```

The result must match the official checksum character for character.

## Installation guide

**Before you start:** installing an operating system can erase all files on the computer. Back up documents, photos, and other important data. If you want to keep Windows or another system, do not select the entire disk or delete partitions without understanding the effect.

### 1. Prepare a USB drive

You will need the official ISO once it is published, a USB drive of at least 4 GB (8 GB or more is preferable), and a computer to prepare it. The process may completely erase the USB drive.

**With Rufus on Windows:**

1. Download Rufus from [rufus.ie](https://rufus.ie/).
2. Connect the USB drive and save elsewhere any files you want to keep.
3. Open Rufus and check that the **Device** field identifies the correct USB drive.
4. Under **Boot selection**, choose **Disk or ISO image** and select the abuel-os ISO.
5. If Rufus asks how to write the image, first use the recommended mode. If the USB drive does not boot and Rufus offers **DD** mode, recreate it using that mode.
6. Click **Start** and confirm only after checking the selected device.
7. Wait for the process to finish and safely eject the USB drive.

You can also use [Ventoy](https://www.ventoy.net/), following its official documentation. Preparing Ventoy on a USB drive may also erase its data; afterward, copy the ISO to the prepared drive.

### 2. Boot from the USB drive

1. Turn off the computer, connect the USB drive, and turn it on again.
2. Open the boot menu by pressing the key indicated by the manufacturer just after powering on. It is often F12, F11, Esc, or another key.
3. Select the USB drive. On modern computers, it is usually best to choose the **UEFI** entry if several appear.
4. Wait for the abuel-os menu to appear and choose the normal startup option.

If the USB drive does not appear, consult the manufacturer's instructions for opening the boot menu. Do not change BIOS/UEFI or security settings at random.

### 3. Try the system and start installation

1. If a test desktop appears, check that the display, keyboard, mouse, sound, and network connection work.
2. **If the ISO includes an installer**, open it and follow the screens. Select the language, time zone, and keyboard layout when prompted.
3. When you reach disk setup, review the options carefully. Using the entire disk can erase existing systems and files.
4. If you want to keep Windows, set up dual boot, or keep partitions with data, stop before confirming and prepare an appropriate partitioning plan.
5. Read the installer's summary of changes. Continue only when the destination disk and partitions are correct.
6. Wait for the installer to indicate that it has finished. Restart and remove the USB drive when prompted.
7. If the computer boots from the USB drive again, restart and select the internal disk from the boot menu.

**Note:** the exact screens and options depend on the installer included in the ISO. If no installer appears or the screens do not match, do not modify the disk; consult that version's specific notes before continuing.

### 4. First login

In version 1.0.2, the planned accounts are:

- **Daily use:** `abuelo`, with automatic login.
- **Responsible person:** `responsable`, with initial password `live`.

Change the responsible account's initial password during the first setup. Do not reuse it on other services or share it publicly. If the credentials in your ISO do not match this information, consult that version's notes.

### 5. After installation

- Check that the system starts without the USB drive connected.
- Check the Internet, sound, screen resolution, keyboard, mouse, and printer if applicable.
- Install available updates using the system tools.
- Keep a backup of important data.
- Agree on who will take care of updates, passwords, and recovery of the computer.

## Requirements

- 64-bit Intel or AMD processor.
- 2 GB of RAM minimum; 4 GB recommended.
- USB drive of at least 4 GB.
- Backup of existing data.
- Internet connection recommended for updates and documentation.

## Help and versions

- [Downloads and published versions](https://github.com/ericsnet/Abuel-os-Downloads/releases)
- [Report a problem with this page](https://github.com/ericsnet/Abuel-os-Downloads/issues)

Copyright (c) 2026 **ericsnet**. All rights reserved.

abuel-os is proprietary software. Downloading an ISO does not by itself grant permission to copy, modify, or redistribute the software beyond what is permitted by applicable law or prior written authorization from ericsnet. See [LICENSE](LICENSE).

## Detailed version history

See the [version index](versions/INDEX.md) for changes, known issues, and publication details for each version. The ISOs are still pending publication in this repository; the index links to the public [Releases](https://github.com/ericsnet/Abuel-os-Downloads/releases) page.