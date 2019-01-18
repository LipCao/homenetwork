package com.importexpress.homenetwork.service.impl;

import com.importexpress.homenetwork.entity.Product;
import com.mongodb.Mongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * *****************************************************************************************
 *
 * @ClassName ProductDetailsSercieImpl
 * @Author: cjc
 * @Descripeion TODO
 * @Date： 2019/1/18 15:19:57
 * @Version 1.0
 * <p>
 * <p>
 * Version    Date                ModifiedBy                 Content
 * --------   ---------           ----------                -----------------------
 * 1.0.0       15:19:572019/1/18     cjc                       初版
 * ******************************************************************************************
 */
@Service
public class ProductDetailsSercieImpl implements com.importexpress.homenetwork.service.ProductDetailsSercie {
    @Autowired
    private MongoHelp mongoHelp;

    @Override
    public Product getProductByPid(Long pid){
        return mongoHelp.findProductByPid(pid);
    }
}
