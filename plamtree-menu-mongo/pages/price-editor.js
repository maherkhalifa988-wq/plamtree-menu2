import useSWR from 'swr'
import {useState} from 'react'
const fetcher = u=>fetch(u).then(r=>r.json())

export default function PriceEditor(){
  const {data,mutate} = useSWR('/api/menu',fetcher)
  const [pwd,setPwd]=useState('')
  if(!data) return <div className="container">جار التحميل...</div>
  const {restaurantName, groups} = data

  async function savePrices(newData){
    const res = await fetch('/api/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pwd,content:JSON.stringify(newData)})})
    if(res.ok){ mutate(); alert('تم حفظ الاسعار'); } else { alert('خطأ'); }
  }

  return <div className="container">
    <div className="topbar">
      <h2>تعديل الاسعار فقط</h2>
      <div><a className="btn" href="/">رجوع</a></div>
    </div>
    <p>أدخل كلمة مرور محرر الأسعار ثم عدل أسعار الأصناف فقط.</p>
    <div style={{marginBottom:8}}>
      <input placeholder="كلمة المرور لمحرر الأسعار" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} />
    </div>
    {groups.map((g,i)=>(
      <div key={i}>
        <h3 className="groupTitle">{g.name}</h3>
        <div className="grid">
          {g.items.map((it,j)=>(
            <div key={j} className="card">
              <img src={it.image||'/placeholder/logo.svg'} alt="" />
              <div style={{marginTop:8,textAlign:'center'}}>
                <div style={{fontWeight:700}}>{it.name}</div>
                <div style={{marginTop:6}}><input type="number" defaultValue={it.price} onChange={(e)=>it.price=Number(e.target.value)} /></div>
                <div className="actions">
                  <button className="btn" onClick={()=>savePrices({...data})}>حفظ</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
}
