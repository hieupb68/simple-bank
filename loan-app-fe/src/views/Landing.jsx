import React, { useEffect } from "react";
const LandingPage = () => {
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      window.location.href = "home";
    }
  });

  return (
    <div className="landing-page">
      <main>
        <section className="flex-column">
          <div className="hero-content mt-5 p-4">
            <h1>Ngân hàng ABCDEFBank</h1>
            <p>Đăng ký để vay tiền với lãi suất hấp dẫn</p>
            <div>
              <p>
                <strong>Bạn chưa có tài khoản ?</strong> <br></br> Hãy tham gia
                với chúng tôi
              </p>
              <a href="/signup" className="btn btn-success">
                Đăng ký
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </div>
  );
};

export default LandingPage;
