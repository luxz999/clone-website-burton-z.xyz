async function configPath() {
    try {
        const response = await fetch("./config.json");
        const config = await response.json();
        const backgroundPath = config.backgroundBody || "../image/fg.webp";

        if (backgroundPath.endsWith('.mp4')) {
            let videoBackground = document.createElement("video");
            videoBackground.src = backgroundPath;
            videoBackground.autoplay = true;
            videoBackground.loop = true;
            videoBackground.muted = true;
            videoBackground.playsInline = true;
            videoBackground.style.position = 'fixed';
            videoBackground.style.top = '0';
            videoBackground.style.left = '0';
            videoBackground.style.width = "100%";
            videoBackground.style.height = "100%";
            videoBackground.style.objectFit = "cover";
            videoBackground.style.zIndex = '-1';
            document.body.prepend(videoBackground);
        } else {
            document.body.style.backgroundImage = "url('" + backgroundPath + "')";
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = "no-repeat";
        }

        const bannerImage = config.BannerProfile || '';
        const bannerElement = document.querySelector(".banner");
        if (bannerElement) {
            bannerElement.style.backgroundImage = "url('" + bannerImage + "')";
        }

        const profileImage = config.Profile || '';
        const profilePicElement = document.querySelector('.profile-pic');
        if (profilePicElement) {
            profilePicElement.style.backgroundImage = "url('" + profileImage + "')";
        }

        const profileFrameImage = config.Profileframe || "../image/profile.png";
        const profileFrameElement = document.querySelector(".profile-frame");
        if (profileFrameElement) {
            profileFrameElement.style.backgroundImage = "url('" + profileFrameImage + "')";
            profileFrameElement.style.backgroundSize = 'contain';
            profileFrameElement.style.backgroundPosition = "center";
            profileFrameElement.style.backgroundRepeat = "no-repeat";
        }

        const profileBannerImage = config.ProfileframeBanner || "../image/intro.png";
        const profileBannerElement = document.querySelector(".profile-frame-banner");
        if (profileBannerElement) {
            profileBannerElement.style.backgroundImage = "url('" + profileBannerImage + "')";
        }
        const favicon = config.favicon || "";
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = favicon;
        document.head.appendChild(link);

    } catch (error) {
        console.error("❌ Error loading config.json:", error);
    }
}
configPath();