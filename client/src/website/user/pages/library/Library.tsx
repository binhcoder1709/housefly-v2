import { TabsProps } from 'antd';
import TabsItem from "../../../../components/tab/Tab";
import './css/style.css'
import LibrarySong from './items/LibrarySong';

export default function Library() {
    const tabItem : TabsProps['items'] = [
        {
            key: '1',
            label: "Bài hát",
            children: <LibrarySong/>
        },
        {
            key: '2',
            label: "Playlist",
            children: 'playlist'
        },
        {
            key: '3',
            label: "Album",
            children: ''
        },
    ]
  return (
    <>
      <div className='p-4'>
        {/* label */}
        <div>
          <h1 className="text-3xl font-bold text-white">Thư viện</h1>
        </div>
        {/* tabs */}
        <TabsItem items={tabItem} cssClass='custom-tab'/>
      </div>
    </>
  );
}
