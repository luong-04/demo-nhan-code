document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('container-nhan-code');
  const nutImg = document.getElementById('nut-nhan-code-img');
  const nenDemNguoc = document.getElementById('nen-dem-nguoc');
  const demNguocText = document.getElementById('dem-nguoc-text');

  container.addEventListener('click', function() {
    if (nutImg.style.display !== 'none') {
      // Lấy IP của người dùng
      fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(ipData => {
          const userIp = ipData.ip;

          // Random 90–120 giây
          var thoiGianDemNguoc = Math.floor(Math.random() * 31) + 90;
          nutImg.style.display = 'none';
          nenDemNguoc.style.display = 'flex';
          container.style.cursor = 'default';

          var demNguocInterval = setInterval(function() {
            if (thoiGianDemNguoc <= 0) {
              clearInterval(demNguocInterval);

              // Gọi Google Sheet API với IP được truyền vào URL
              fetch("https://script.google.com/macros/s/AKfycbyRqnJhZlSUu4laD25k6S6KtTRVAZ0kXiz7b2DjIIUMPMkRlSA_vyl63mrNPcpLyqoT9g/exec" + userIp) // Cập nhật URL và thêm tham số ?ip=
                .then(res => res.json())
                .then(data => {
                  if (data.success) {
                    demNguocText.textContent = "Code của bạn: " + data.code;
                  } else {
                    demNguocText.textContent = data.message;
                  }
                })
                .catch(err => {
                  demNguocText.textContent = "Lỗi kết nối API!";
                });

            } else {
              demNguocText.textContent = "Vui lòng chờ: " + thoiGianDemNguoc + "s";
              thoiGianDemNguoc--;
            }
          }, 1000);
        })
        .catch(err => {
          demNguocText.textContent = "Không thể lấy IP của bạn!";
        });
    }
  });
});
