import {useState,useEffect} from 'react'
import useSWR from 'swr'
const fetcher = (u)=>fetch(u).then(r=>r.json())

export default function Admin(){
  const {data}=useSWR('/api/menu',fetcher)
  const [jsonText,setJsonText]=useState('')
  const [pwd,setPwd]=useState('')
  const [msg,setMsg]=useState('')
  useEffect(()=>{ if(data) setJsonText(JSON.stringify(data,null,2)) },[data])
  async function save(){
    setMsg('جاري الحفظ...')
    const res = await fetch('/api/save',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pwd,content:jsonText})})
    const j = await res.json()
    if(res.ok) setMsg('تم الحفظ بنجاح.'); else setMsg('خطأ: '+(j.error||'غير معروف'))
  }
  return (<div className="container">
    <div className="topbar">
      <h2>لوحة تحكم الادمن — كامل</h2>
      <div><a className="btn" href="/">عرض المنيو</a></div>
    </div>
    <p>ادخل كلمة المرور (ADMIN_PASS) ثم عدل JSON للمنيو بالكامل.</p>
    <div>
      <input placeholder="كلمة المرور" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} />
      <button className="btn" onClick={save} style={{marginLeft:8}}>حفظ</button>
    </div>
    <textarea style={{width:'100%',height:420,marginTop:12,fontFamily:'monospace'}} value={jsonText} onChange={e=>setJsonText(e.target.value)} />
    <div className="small" style={{marginTop:8}}>{msg}</div>
  </div>)
}
