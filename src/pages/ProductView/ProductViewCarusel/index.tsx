import { useState } from "react";
import { Image, Tabs } from "antd";
import "./_style.scss";


const { TabPane } = Tabs;

const productImgs = [
  {
    id: "1",
    img: "/assets/img/Computer.png"
  },
  {
    id: "2",
    img: "/assets/img/smart_watch.png"
  },
  {
    id: "3",
    img: "/assets/img/Computer.png"
  },
  {
    id: "4",
    img: "/assets/img/smart_watch.png"
  },

]

function ProductViewCarusel() {

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="product_view_carusel">
      <Tabs className="product_tabs" tabPosition={"bottom"}>
        {
          productImgs.map(img => (
            <TabPane tab={<img src={img.img} alt="product" />} key={img.id}>
              <div className="img_body">
                <Image
                  preview={{ visible: false }}
                  width={"100%"}
                  src={img.img}
                  onClick={() => setVisible(true)}
                />
              </div>
            </TabPane>
          ))
        }


      </Tabs>


      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          {
            productImgs.map(img => (
              <Image src={img.img} key={img.id} />
            ))
          }
        </Image.PreviewGroup>
      </div>
    </div>
  )
}

export default ProductViewCarusel