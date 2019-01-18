package com.importexpress.homenetwork.service.impl;

import com.google.gson.Gson;
import com.importexpress.homenetwork.entity.Product;
import com.mongodb.Block;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.json.JsonWriterSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

/**
 * @author luohao
 * @date 2018/12/11
 */
@Service
public class MongoHelp {

    private static final String COLLECTION_PRODUCT = "product";
    private static final String PID = "pid";
    private static final int DEFAULT_PAGE = 0;
    private static final int DEFAULT_PAGE_SIZE = 30;

    private MongoTemplate mongoTemplate;
    private MongoCollection<Document> collection;

    @Autowired
    public MongoHelp(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
        this.collection = this.mongoTemplate.getDb().getCollection(COLLECTION_PRODUCT);
    }

    /**
     * find product by pid
     * @param pid
     * @return
     */
    public Product findProductByPid(long pid) {

        List<Product> lstProduct = findProductsBypids(Arrays.asList(pid));
        if (lstProduct.size() == 0) {
            throw new IllegalStateException("Not find the record!");
        } else if (lstProduct.size() > 1) {
            throw new IllegalStateException("There are multiple records!");
        } else {
            return lstProduct.get(0);
        }
    }

    /**
     * find products by pids
     * @param pids
     * @return
     */
    public List<Product> findProductByPid(List<Long> pids) {

        return findProductsBypids(pids);
    }

    /**
     * find Products
     * @param map
     * @return
     */
    public List<Product> findProducts(Map<String,String> map) {
        return findProducts(map, DEFAULT_PAGE, DEFAULT_PAGE_SIZE);
    }

    /**
     * find Products
     * @param map
     * @param page
     * @param pageSize
     * @return
     */
    public List<Product> findProducts(Map<String,String> map, int page, int pageSize) {

        if(map == null || map.size() == 0 || page <0 || pageSize < 1){
            throw new IllegalArgumentException("input params invalid!");
        }

        List<Bson> lstEqs = new ArrayList<>(map.size());
        map.forEach((t, u) -> lstEqs.add(Filters.eq(t, u)));

        FindIterable<Document> product = this.collection.find(Filters.and(lstEqs)).skip(page*pageSize).limit(pageSize);
        List<Product> lstProduct = new ArrayList<>();
        JsonWriterSettings settings = JsonWriterSettings.builder()
                .int64Converter((value, writer) -> writer.writeNumber(value.toString()))
                .build();
        final Gson gson = new Gson();
        product.forEach((Consumer<? super Document>) i -> lstProduct.add(gson.fromJson(i.toJson(settings), Product.class)));
        return lstProduct;
    }


    /**
     * find product by key and value
     * @param pids
     * @return
     */
    private List<Product> findProductsBypids(List<Long> pids) {

        FindIterable<Document> product = null;
        product = collection.find(Filters.in(PID, pids));
        List<Product> lstProduct = new ArrayList<>();
        final Gson gson = new Gson();
        JsonWriterSettings settings = JsonWriterSettings.builder()
                .int64Converter((value, writer) -> writer.writeNumber(value.toString()))
                .build();
        product.forEach((Consumer<? super Document>) i -> lstProduct.add(gson.fromJson(i.toJson(settings), Product.class)));
        return lstProduct;
    }

    public List<Product> findAmazonProducts(int pageNum) {
        List<Product> lstProduct = new ArrayList<>();
        FindIterable<Document> product = null;
        ;
        product = collection.find(Filters.and(Filters.ne("valid", "0"), Filters.eq("matchSource", "4"))).skip(pageNum).limit(30);//分页查询，每次查30条
        product.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                JsonWriterSettings settings = JsonWriterSettings.builder()
                        .int64Converter((value, writer) -> writer.writeNumber(value.toString()))
                        .build();
                String json = document.toJson(settings);
                Gson gson = new Gson();
                lstProduct.add(gson.fromJson(json, Product.class));
            }
        });
        return lstProduct;
    }

    public List<Product> findProductByParam(String shopId){
        List<Product> lstProduct = new ArrayList<>();
        FindIterable<Document> product = null;
        product = collection.find(Filters.and(Filters.eq("valid", "1"), Filters.eq("shop_id", shopId))).sort(Filters.eq("is_stock_flag", -1)).skip(0).limit(60);
        product.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {
                JsonWriterSettings settings = JsonWriterSettings.builder()
                        .int64Converter((value, writer) -> writer.writeNumber(value.toString()))
                        .build();
                String json = document.toJson(settings);
                Gson gson = new Gson();
                lstProduct.add(gson.fromJson(json, Product.class));
            }
        });
        return lstProduct;
    }
}
