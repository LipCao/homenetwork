package com.importexpress.homenetwork.controller;

import com.importexpress.homenetwork.entity.Product;
import com.importexpress.homenetwork.entity.ResultBean;
import com.importexpress.homenetwork.service.ProductDetailsSercie;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * *****************************************************************************************
 *
 * @ClassName ProductDetailsController
 * @Author: cjc
 * @Descripeion TODO
 * @Date： 2019/1/18 13:10:57
 * @Version 1.0
 * <p>
 * <p>
 * Version    Date                ModifiedBy                 Content
 * --------   ---------           ----------                -----------------------
 * 1.0.0       13:10:572019/1/18     cjc                       初版
 * ******************************************************************************************
 */
public class ProductDetailsController {
    @Autowired
    private ProductDetailsSercie productDetailsSercie;

    @RequestMapping("/getProductDetails")
    public ResultBean getProductDetailsByPid(HttpServletRequest request, Model model) {
        ResultBean result = new ResultBean();
        String requestURI = request.getRequestURI();
        if (StringUtils.isBlank(requestURI)) {
            result.setCode(ResultBean.FAIL);
            result.setMsg("Request is null!");
            return result;
        }
        boolean b = requestURI.indexOf("-") > -1;
        if (!b) {
            result.setCode(ResultBean.FAIL);
            result.setMsg("This request is not right!");
            return result;
        }
        String[] split = requestURI.split("-");
        int length = split.length;
        String itemId = split[length-1];
        if (StringUtils.isNotBlank(itemId)) {
            itemId = itemId.substring(1);
        }
        long pid = Long.parseLong(itemId);
        Product product = productDetailsSercie.getProductByPid(pid);
        if(product == null){
            result.setCode(ResultBean.FAIL);
        }
        result.setData(product);
        result.setCode(ResultBean.SUCCESS);
        return result;
    }
}
