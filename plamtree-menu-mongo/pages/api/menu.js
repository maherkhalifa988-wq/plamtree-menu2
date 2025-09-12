import dbConnect from "../../lib/mongodb";
import Menu from "../../models/Menu";

export default async function handler(req,res){
  await dbConnect();
  if(req.method==="GET"){
    let menu = await Menu.findOne();
    if(!menu){
      // إذا لم يوجد منيو، أنشئ منيو افتراضي
      menu = await Menu.create({
        restaurantName: "مطعم النخيل",
        logo: "/placeholder/logo.svg",
        background: "/placeholder/bg.svg",
        groups: [
          {name:"عصير فريش", items:[{name:"عصير برتقال",price:8,image:"/placeholder/logo.svg"}]}
        ]
      });
    }
    res.status(200).json(menu);
  } else {
    res.status(405).json({error:"Method not allowed"});
  }
}
