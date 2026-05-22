Rename-Item -Path "Photos\WhatsApp Image 2026-05-17 at 8.54.00 PM.jpeg" -NewName "photo1.jpeg"
Rename-Item -Path "Photos\WhatsApp Image 2026-05-17 at 8.54.04 PM.jpeg" -NewName "photo2.jpeg"
Rename-Item -Path "Photos\WhatsApp Image 2026-05-17 at 8.54.06 PM.jpeg" -NewName "photo3.jpeg"
Rename-Item -Path "Photos\WhatsApp Image 2026-05-17 at 8.54.12 PM.jpeg" -NewName "photo4.jpeg"
Rename-Item -Path "Photos\WhatsApp Image 2026-05-17 at 8.54.14 PM.jpeg" -NewName "photo5.jpeg"

Move-Item -Path "Photos\photo*.jpeg" -Destination "..\..\"

Rename-Item -Path "Photos\background remve\WhatsApp_Image_2026-05-17_at_8.54.00_PM-removebg-preview.png" -NewName "photo1-nobg.png"
Rename-Item -Path "Photos\background remve\WhatsApp_Image_2026-05-17_at_8.54.04_PM-removebg-preview.png" -NewName "photo2-nobg.png"
Rename-Item -Path "Photos\background remve\WhatsApp_Image_2026-05-17_at_8.54.06_PM-removebg-preview.png" -NewName "photo3-nobg.png"
Rename-Item -Path "Photos\background remve\WhatsApp_Image_2026-05-17_at_8.54.12_PM-removebg-preview.png" -NewName "photo4-nobg.png"
Rename-Item -Path "Photos\background remve\WhatsApp_Image_2026-05-17_at_8.54.14_PM-removebg-preview.png" -NewName "photo5-nobg.png"

Move-Item -Path "Photos\background remve\photo*.png" -Destination "..\..\..\"
