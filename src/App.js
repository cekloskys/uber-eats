import { Layout, Image } from 'antd';
import AppRoutes from './components/Routes';
import SideMenu from './components/SideMenu';

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Sider style={{height: '100vh', backgroundColor: 'white'}}>
        <Image 
          src='https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Symbol.jpg' 
          preview={false} 
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
          <AppRoutes />
        </Content>
        <Footer style={{textAlign: 'center'}}>
          Uber Eats Dashboard @2022
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
