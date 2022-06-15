import { Tabs } from 'antd';
import TabsComp from './TabsComp';
import "./_style.scss";

const { TabPane } = Tabs;

// header menu tabs data 

interface IHeeaderTopMenusTabs {
  setActiveKey: React.Dispatch<React.SetStateAction<string>>,
  headerMenusTabsData: any
}

function HeaderTopMenusTabs(props: IHeeaderTopMenusTabs) {

  const { setActiveKey, headerMenusTabsData } = props;

  const handleTabChange = (activeKey: string) => setActiveKey(activeKey);


  return (
    <div className="menus_tabs desktop_menus_tabs">
      <Tabs defaultActiveKey="1" tabPosition={"left"} onChange={handleTabChange}>
        {
          headerMenusTabsData.map((tabData: any) => (
            <TabPane tab={<TabsComp img={tabData.tab.img} title={tabData.tab.title} text={tabData.tab.text} />} key={tabData.key}>
              {tabData.component}
            </TabPane>
          ))
        }
      </Tabs>

    </div>
  )
}

export default HeaderTopMenusTabs