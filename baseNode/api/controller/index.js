const userModel = require("../model/index");
const fs = require("fs")
exports.getItem = async (req, res) => {
  try {
    const listData = await userModel.find({});
    res.send({ listData });
  } catch (error) {
    res.send({ error: "error" });
  }
};

exports.addItem = async (req, res) => {
  try {
    const fileImg = req.files;
    const name = req.body.name;
    let arrImg = [];
    for (let i = 0; i < fileImg.length; i++) {
      const url = `http://localhost:3001/${fileImg[i].filename}`;
      arrImg.push(url);
    }
    await userModel.create({ name, img: arrImg, time: Date.now() });
    res.send({ message: "success" });
  } catch (error) {
    res.send({ error: "error" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id
    const data = await userModel.findByIdAndDelete(id)
    for(let i =0;i<data.img.length;i++){
        fs.unlinkSync(`media/${data.img[i].slice(22)}`)
    }
    res.send({message:"success"})
  } catch (error) {
    res.send({ error: "error" });
  }
};

exports.updateItem = async (req, res) => {
    try {
        const id = req.params.id
        const fileImg = req.files
        const name = req.body.name 
        let arrImg = []
        for (let i=0;i<fileImg.length;i++){
            const url = `http://localhost:3001/${fileImg[i].filename}`
            arrImg.push(url)
        }
        const data = await userModel.findByIdAndUpdate(id, {name:name, img:arrImg})
        for( let i=0; i<data.img.length;i++){
            fs.unlink(`media/${data.img[i].slice(22)}`,()=>{})
        }
        res.send({message:"success"})
    } catch (error) {
        res.send({error:"error"})
    }
}

exports.deleteOneItem = async (req, res) => {
    try {
        const id = req.query.id
        const index = req.query.index
        const Item = await userModel.findById(id)
        fs.unlinkSync(`media/${Item.img[index].slice(22)}`)
        await Item.img.splice(index, 1)
        await userModel.findByIdAndUpdate(id, { img: Item.img })
        res.send({ message: 'xóa thành công' })
    } catch (error) {
        res.send({
            message: "xóa lỗi"
        })
    }
}

exports.paginateItem = async (req, res) => {
    try {
        const activePage = +req.query.activePage
        const limit = +req.query.limit
        const skip = (activePage -1)*limit
        const totalRecord = await userModel.countDocuments({})
        const totalPage = Math.ceil(totalRecord/limit)
        const listData = await userModel.find({}).skip(skip).limit(limit)
        res.send({totalPage, listData})
    } catch (error) {
        res.send({error:"error"})
    }
}

exports.searchItem = async (req, res) => {
    try {
        const textSearch = req.query.textSearch
        const activePage = req.query.activePage
        const limit = req.query.limit
        const skip = (activePage -1)*limit
        const totalRecord = await userModel.countDocuments({name:{$regex:textSearch, $options:'i'}})
        const totalPage = Math.ceil(totalRecord/limit)
        const listData = await userModel.find({name:{$regex:textSearch, $options:'i'}}).skip(skip).limit(limit)
        res.send({totalPage, listData})
    } catch (error) {
        res.send({error:"error"})
    }
}

