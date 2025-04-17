function injectSocialIcons(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="social-icons">
                <div class="icon-item">
                    <img src="./image/o.png" width="30px" height="30px">
                    <div class="tooltip">โอปอล</div>
                </div>
                <div class="icon-item">
                    <img src="./image/bage5.png" width="30px" height="30px">
                    <div class="tooltip">กิจกรรม Hypesquad</div>
                </div>
                <div class="icon-item">
                    <img src="./image/bage4.png" width="30px" height="30px">
                    <div class="tooltip">ผู้สนับสนุนแรกเริ่ม</div>
                </div>
                <div class="icon-item">
                    <img src="./image/bage7.png" width="30px" height="30px">
                    <div class="tooltip">การบูสต์เซิร์ฟเวอร์</div>
                </div>
                <div class="icon-item">
                    <img src="./image/bage3.png" width="30px" height="30px">
                    <div class="tooltip">เดิมชื่อ Burton XR</div>
                </div>
                <div class="icon-item">
                    <img src="./image/bage.png" width="30px" height="30px">
                    <div class="tooltip">ผู้พัฒนาที่ให้บริการอยู่</div>
                </div>
                <div class="icon-item">
                    <img src="./image/ff.png" width="30px" height="30px">
                    <div class="tooltip">Discord Bug Hunter</div>
                </div>
                <div class="icon-item">
                    <img src="./image/bage8.png" width="30px" height="30px">
                    <div class="tooltip">ทำเควสต์สำเร็จแล้ว</div>
                </div>
            </div>`;
        container.className = "social";
    } else {
        console.error(`Element with id ${containerId} not found`);
    }
}

injectSocialIcons("social");