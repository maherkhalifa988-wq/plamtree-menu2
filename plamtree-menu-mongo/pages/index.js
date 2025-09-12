import Head from 'next/head'
import useSWR from 'swr'
import MenuGrid from '../components/MenuGrid'

const fetcher = (url)=>fetch(url).then(r=>r.json())

export default function Home(){
  const {data} = useSWR('/api/menu', fetcher)
  if (!data) return <div className="container">جار التحميل...</div>
  const {restaurantName, logo, background, groups} = data
  return (
    <div>
      <Head>
        <title>{restaurantName} - منيو</title>
      </Head>
      <img src={background||'/placeholder/bg.svg'} className="bg-cover" alt="background" />
      <main className="container">
        <div className="topbar">
          <div className="header">
            <img src={logo||'/placeholder/logo.svg'} className="logo" alt="logo" />
            <div>
              <h1 style={{margin:0}}>{restaurantName}</h1>
              <div className="small">امسح رمز الـ QR للوصول للمنيو</div>
            </div>
          </div>
          <div>
            <a className="btn" href="/admin">دخول الادمن</a>
            <a className="btn" href="/price-editor" style={{marginLeft:8}}>تعديل الاسعار</a>
          </div>
        </div>
        <MenuGrid groups={groups} currency={'ر.س'} />
        <footer className="footer">
          تصميم ملفت واحترافي — جاهز للنشر على Vercel.
        </footer>
      </main>
    </div>
  )
}
