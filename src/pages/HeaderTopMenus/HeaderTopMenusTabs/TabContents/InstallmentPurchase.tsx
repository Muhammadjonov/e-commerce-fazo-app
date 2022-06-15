import React from 'react';
import "./_content_style.scss";

const InstallPurchaseCardData = [
  {
    id: "1",
    title: "Как купить в рассрочку в Top-IT?",
    content: `
    <p class="tab_text">
    Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют.
    </p>
    `
  },
  {
    id: "2",
    title: "Вы можете приобрести товар несколькими способами:",
    content: `
    <p class="tab_text">
    1. Давно выяснено, что при оценке дизайна и композиции читаемый текст
    мешает сосредоточиться.
    </p>
    <p class="tab_text">
    2. Lorem Ipsum используют потому, что тот обеспечивает более или менее
    </p>
    `
  },
  {
    id: "3",
    title: "Для покупки онлайн вам потребуется:",
    content: `
    <p class="tab_text">
    1. Давно выяснено, что при оценке дизайна и композиции читаемый текст
    мешает сосредоточиться.
    </p>
    <p class="tab_text">
    2. Lorem Ipsum используют потому, что тот обеспечивает более или менее
    </p>
    <p class="tab_text">
    3. Оценке дизайна и композиции читаемый текст.
    </p>
    <p class="tab_text">
    4. Потому, что тот обеспечивает более или менее
    </p>
    `
  },
  {
    id: "4",
    title: "Кому выдается рассрочка?",
    content: `
    <p class="tab_text">
    Также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют.
    </p>
`
  },
  {
    id: "5",
    title: "До скольки работает Call-центр?",
    content: `
    <p class="tab_text">
    Режим работы контакт-центра: каждый день с 9:00 до 21:00.
    </p>
    <p class="tab_text">
    Будем рады ответить на ваши вопросы по телефону +998 91 123 45 67
    </p>
    `
  },

]

function InstallmentPurchase() {
  return (
    <div className="installment_purchase">
      {
        InstallPurchaseCardData.map(data => (
          <div className="installment_purchase_card" key={data.id}>
            <h4 className="title24_bold tab_content_title">
              {data.title}
            </h4>
            <div className="inst_body" dangerouslySetInnerHTML={{ __html: data.content }}>

            </div>
          </div>
        ))
      }
    </div>
  )
}

export default InstallmentPurchase