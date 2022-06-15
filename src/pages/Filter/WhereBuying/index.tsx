import React, { useState } from 'react';
import "./_style.scss";

const buyingWhereText = `
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis sit illo reprehenderit! Voluptate quas odio laudantium assumenda qui ab molestiae aliquid quos, voluptatibus facere minus cupiditate ratione porro alias perferendis deleniti ipsum aut vitae quam ullam voluptatum omnis dolorum eligendi numquam? Tempora porro blanditiis maxime, aliquid, perferendis dicta tempore corporis assumenda animi quos ratione fuga velit doloremque consequatur earum incidunt voluptatem sit reiciendis error excepturi pariatur deleniti hic. Natus at, beatae sed quisquam similique ut atque harum placeat officiis, repellat accusantium culpa corrupti cupiditate deleniti sequi quia tempora? Quis nemo molestias temporibus cupiditate animi veritatis qui saepe inventore! Voluptate, dolores.
Lorem ipsum, dolor sit amet consectetur adipisicing elit. In aliquid quod veniam, nesciunt voluptatum repellat quisquam odit beatae optio atque id nihil soluta, ab laborum. Et voluptate dignissimos possimus adipisci cupiditate, beatae quos natus neque hic repellat molestias minima, culpa quidem aliquam exercitationem sunt, ipsam commodi nisi quaerat a qui vero accusantium. Possimus repellat rem, aliquid corrupti animi quibusdam ad laudantium fugiat minus! Dolore ad sapiente hic cumque fugiat repellendus, nemo facere nam suscipit dignissimos dolor enim eveniet sequi? Iste blanditiis, eos eius ipsa architecto adipisci cum placeat suscipit vero, fugiat quasi consequuntur voluptates voluptatum. Numquam tempore officia dolore placeat illo nam, quisquam quis voluptate maiores? Et quod illo, aliquam sunt, nemo maxime deleniti neque eveniet sequi tenetur quas soluta quis recusandae blanditiis minima perspiciatis repellat eaque pariatur dolorem nostrum ab a? Voluptatibus nam voluptas, dignissimos fugit eaque excepturi a in. Voluptate eius aspernatur ipsa facilis illo harum libero debitis neque nemo, facere quia provident dolorum ut minima repellendus hic blanditiis quidem voluptatem corrupti excepturi assumenda. Nobis quis quisquam consequatur iste animi voluptatibus fugiat ea praesentium voluptates iure atque, nihil qui iusto? Libero quaerat nihil quos quisquam, praesentium labore ad hic impedit magni. Quisquam omnis assumenda molestiae, amet perspiciatis rem?
Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, nisi libero a sequi repellat, ut cupiditate cumque qui consequatur, optio tempore? Possimus aspernatur vero recusandae blanditiis, voluptas tenetur eveniet delectus magni, provident assumenda deleniti laudantium perspiciatis, libero quis fuga exercitationem voluptatem. Corporis laboriosam voluptatem aspernatur fugiat eaque sit, temporibus ad.
`;

function WhereBuying() {

  const [isShowMore, setIsShowMore] = useState<boolean>(true);

  const toggleShowMore = () => setIsShowMore(prev => !prev);

  return (
    <div className="where_buying">
      <h3 className="buying_title title24_bold">
        Где купить надежный смартфон в Ташкенте?
      </h3>
      <div className={`buying_text ${!isShowMore ? "auto" : ""}`}>
        <p className={`p14_regular`}>
          {buyingWhereText}
        </p>
      </div>

      <button className="show_btn title20_bold" onClick={toggleShowMore}>
        {isShowMore ? "Показать больше" : "Cкрыть"}  <i className={`fa-solid fa-angle-${isShowMore ? "down" : "up"}`}></i>
      </button>

    </div>
  )
}

export default WhereBuying