import dbConnect from "../../lib/mongodb";
import Menu from "../../models/Menu";

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end();
  const {password, content} = req.body || {};
  const ADMIN_PASS = process.env.ADMIN_PASS;
  const PRICE_PASS = process.env.PRICE_PASS;
  const isAdmin = password === ADMIN_PASS;
  const isPrice = password === PRICE_PASS;
  if(!isAdmin && !isPrice) return res.status(401).json({error:'كلمة المرور غير صحيحة'});

  await dbConnect();
  let newData;
  try{ newData = JSON.parse(content); }catch(e){ return res.status(400).json({error:'JSON غير صالح'}); }

  if(isPrice){
    const original = await Menu.findOne();
    if(!original) return res.status(500).json({error:"لا يوجد منيو"});
    try{
      if(original.groups.length !== newData.groups.length) throw 'عدد المجموعات تغير';
      for(let i=0;i<original.groups.length;i++){
        if(original.groups[i].name !== newData.groups[i].name) throw 'اسم المجموعة تغير';
        if(original.groups[i].items.length !== newData.groups[i].items.length) throw 'عدد الاصناف تغير';
        for(let j=0;j<original.groups[i].items.length;j++){
          if(original.groups[i].items[j].name !== newData.groups[i].items[j].name) throw 'اسم الصنف تغير';
          if(original.groups[i].items[j].image !== newData.groups[i].items[j].image) throw 'الصورة تغيرت';
        }
      }
    }catch(err){
      return res.status(403).json({error:'يسمح لك فقط تعديل الأسعار: '+String(err)});
    }
  }

  await Menu.deleteMany({});
  await Menu.create(newData);
  res.status(200).json({ok:true});
}
