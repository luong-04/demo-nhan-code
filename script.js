document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container-nhan-code');
    const nutImg = document.getElementById('nut-nhan-code-img');
    const nenDemNguoc = document.getElementById('nen-dem-nguoc');
    const demNguocText = document.getElementById('dem-nguoc-text');
  
    container.addEventListener('click', function() {
      if (nutImg.style.display !== 'none') {
        // Random 90–120 giây
        var thoiGianDemNguoc = Math.floor(Math.random() * 31) + 90;
  
        nutImg.style.display = 'none';
        nenDemNguoc.style.display = 'flex';
        container.style.cursor = 'default';
  
        var demNguocInterval = setInterval(function() {
          if (thoiGianDemNguoc <= 0) {
            clearInterval(demNguocInterval);
  
            // Gọi Google Sheet API
            fetch("https://script.google.com/macros/s/AKfycbwGL4GlG5khb8QXDYzDjBGRgfRlb2FLKMTDhB6p-OK_8PzpeG_Ksz7iGkDNfeUDIukl6A/exec") // đổi link này bằng link web app của bạn
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
      }
    });
  });
  