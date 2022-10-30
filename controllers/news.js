const News = require('../models/news')
const User = require('../models/user')

const Imagetobase64 = require('image-to-base64')

//@desc -> add news

exports.addNews = async (req, res, next) =>{
    try {
        
        //const user = await User.findById(req.params.userId);
        const {title,category, campus} = req.body;

        const base64Data = await Imagetobase64(req.files.newsImage.path);
        

        const news = await new News({
            title, category, campus, newsImage: `data:${req.files.newsImage.type};base64,${base64Data}`, addedAt: Date.now()
        }).save();

        if(news) {
            res.status(201).json({
                success:true,
                msg:"Successfully added new",
                data: news
            })
        } else {
            res.status(400).json({
                success: false,
                msg:"Invalid News Data"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg:"Internal Error"
        })
    }
}

//@desc fetch all news

exports.getAllNews = async (req,res,next) =>{
    try {
        

        // const size = req.params.pageSize;
        // const pageNo = req.params.pageNo;

        // var query = {};

        // if(pageNo < 0 || pageNo === 0){
        //     return res.status(401).json({
        //         success: false,
        //         msg:'Invalid page number, should start with 1'
        //     })
        // }

        // query.skip = size * (pageNo - 1);
        // query.limit = size;

        const newsCount = await News.find({});
        const news = await News.find({})
         .sort('-addedAt')
         .populate({ path: 'category', select: ['_id', 'category_name'] })
        //  .limit(Number(query.limit))
        //  .skip(Number(query.skip))

        res.json({
            success: true,
            count: newsCount.length,
            data: news
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
}

exports.getNewsById = async (req,res,next) =>{
    try {
        const news = await News.findById(req.params.newsId)
         .sort('-addedAt')
         .populate({ path: 'category', select: ['_id', 'category_name'] })

         res.json({
            success: true,
            data: news
         })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
}

exports.getMainCampusNews = async (req,res, next)=>{
    try{
    const searchField = req.query.campus
    const news = await News.find({campus: {$regex: searchField, $options :'$i'}})
    .sort('-addedAt')
    .populate({ path: 'category', select: ['_id', 'category_name'] })

    
    res.status(200).json({
        count: news.length,
        data: news
    })
    
} catch(error){
    console.log(error)
    res.status(500).json({
        success: false,
        msg: "Internal Error Ocurred"
    })
}
}


exports.getIperuCampusNews = async (req,res, next)=>{
    try{
    const news = await News.find({campus: 'Iperu'})

        res.status(200).json({
            count: news.length,
            data: news
        })
    
} catch(error){
    res.status(500).json({
        success: false,
        msg: "Internal Error Ocurred"
    })
}
}
// getSliderNews
exports.getSliderNews = async (req,res,next) =>{
    try {
        const news = await News.find({ addToSlider: true })
         .populate({ path: 'category', select: ['_id', 'category_name'] })

         res.json({
            success: true,
            count: news.length,
            data: news
         })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
}

exports.getNewsByCategory = async (req,res,next) =>{
    try {
        const news = await News.find({ category: req.params.catId })
         .populate({ path: 'category', select: ['_id', 'category_name'] })

         res.json({
            success: true,
            count: news.length,
            data: news
         }) 
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
}

exports.deleteNewsById = async (req,res,next) =>{
    try {
        const news = await News.findByIdAndDelete(req.params.newsId);
        

        res.json({
            success: true,
            msg:"Successfully Deleted",
            data: news
        });

        if(!news){
            res.json({
                success: false,
                msg: "News not found"
            });
        }
        
    } catch (error) {
        
            res.status(500).json({
                success: false,
                msg: 'Internal Error Occured'
            })
    }
}

exports.updateNewsById = async (req,res,next) =>{
    try {

        
        const news = await News.findByIdAndUpdate(req.params.newsId, req.body, {
            new: true,
            runValidators: true
        });
       

        res.status(201).json({
            success: true,
            msg:"Successfully Updated",
            data: news
        });

        if(!news){
            res.status(401).json({
                success: false,
                msg: "News not found"
            });
        }
        
    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            success: false,
            msg: 'Internal Error Occured'
        })
    }
}








