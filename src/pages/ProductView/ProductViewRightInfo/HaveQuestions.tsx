const HaveQuestions = () => {
  return (
    <div className="have_questions product_view_right_info_card">
      <i className="fa-solid fa-headset"></i>
      <div className="product_view_right_info_card_body">
        <h5 className="card_title">
          Есть вопросы?
        </h5>
        <p className="content">
          Телефон: <a href="tel:+998 99 990 45 27" className="social_link">
            +998 99 990 45 27
          </a>
        </p>
        <p className="content">
          Телеграм: <a href="https://t.me/mixel_uz" className="social_link">
            @mixel_uz
          </a>
        </p>
        <p className="content">
          Эл. почта: <a href="mailto:mixel@emali.uz" className="social_link">
            mixel@emali.uz
          </a>
        </p>
      </div>
    </div>
  )
}

export default HaveQuestions;