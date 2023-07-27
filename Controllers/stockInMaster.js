const { sql, poolPromise } = require("../db");
const errorHandle = require("../services/errorHandler");
const utility = require("../utility");

class StockInMasterController {
  async getData(req, res) {
    try {
      if (!req.query.hasOwnProperty("RestaurantId"))
        throw "Please provide RestaurantId!";
      else {
          const pool = await poolPromise;
          let result = await pool
                          .request()
                          .input("RestaurantId", req.query.RestaurantId)
                          .execute("getStockInMasterData")
          if (result.recordset[0].mainData!=null){
            res.json({status: true, data:JSON.parse(result.recordset[0].mainData)})
  
          }
          else{
            res.json({status: true, message: []})
          }
          }
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }
  // async getData(req, res) {
  //   try {
  //     if (!req.query.hasOwnProperty("RestaurantId"))
  //       throw "Please provide RestaurantId!";
  //     const pool = await poolPromise;

  //     const result = await pool.query(
  //       `SELECT StockInMaster.StockId, StockInMaster.RestaurantId,  StockInMaster.SoftDrinkId, SoftDrinkMaster.SoftDrinkName, StockInMaster.SoftDrinkQuantityId, ConfigurationMaster.ConfigName AS SoftDrinkQuantityName, ReceivedQty,IssuedQty,BalanceQty,  Rate, TotalAmt, StockInMaster.CreatedBy, StockInMaster.CreatedDate, StockInMaster.UpdatedBy, StockInMaster.UpdatedDate FROM StockInMaster, SoftDrinkMaster, ConfigurationMaster WHERE StockInMaster.SoftDrinkId = SoftDrinkMaster.SoftDrinkId AND StockInMaster.SoftDrinkQuantityId = ConfigurationMaster.ConfigId AND StockInMaster.RestaurantId=${req.query.RestaurantId}`
  //     );
  //     res.json({ status: true, data: result.recordset });
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async getQuantity(req, res) {
    try {
      if (!req.query.hasOwnProperty("SoftDrinkId"))
        throw "Please provide SoftDrinkId!";
      else {
          const pool = await poolPromise;
          let result = await pool
                          .request()
                          .input("SoftDrinkId", req.query.SoftDrinkId)
                          .execute("getQuantity")
          if (result.recordset[0].mainData!=null){
            res.json({status: true, data:JSON.parse(result.recordset[0].mainData)})
  
          }
          else{
            res.json({status: true, message: []})
          }
          }
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }

  // async getQuantity(req, res) {
  //   try {
  //     if (!req.query.hasOwnProperty("SoftDrinkId"))
  //       throw "Please provide SoftDrinkId!";
  //     const pool = await poolPromise;

  //     const result = await pool.query(
  //       `select distinct StockInMaster.SoftDrinkQuantityId,ConfigurationMaster.ConfigName from StockInMaster 
  //       inner join ConfigurationMaster on ConfigurationMaster.ConfigId=StockInMaster.SoftDrinkQuantityId
  //       where SoftDrinkId=${req.query.SoftDrinkId}
  //       group by SoftDrinkQuantityId,ConfigurationMaster.ConfigName`
  //     );
  //     res.json({status: true, data: result.recordset});
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async getActualRate(req, res) {
    try {
      if (
        !(
          req.query.RestaurantId &&
          req.query.SoftDrinkId &&
          req.query.SoftDrinkQuantityId
        )
      )
        throw "Please fill all the details";
      else {
          const pool = await poolPromise;
          let result = await pool
                          .request()
                          .input("RestaurantId",req.query.RestaurantId)
                          .input("SoftDrinkId", req.query.SoftDrinkId)
                          .input("SoftDrinkQuantityId",req.query.SoftDrinkQuantityId)
                          .execute("getActualRate")
          if (result.recordset[0].mainData!=null){
            res.json({status: true, data:JSON.parse(result.recordset[0].mainData)})
  
          }
          else{
            res.json({status: true, message: []})
          }
          }
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }
  // async getActualRate(req, res) {
  //   try {
  //     if (
  //       !(
  //         req.query.RestaurantId &&
  //         req.query.SoftDrinkId &&
  //         req.query.SoftDrinkQuantityId
  //       )
  //     )
  //       throw "Please fill all the details";
  //     const pool = await poolPromise;
  //     const result = await pool.query(
  //       `SELECT * from StockInMaster WHERE RestaurantId=${req.query.RestaurantId} AND SoftDrinkId=${req.query.SoftDrinkId} AND SoftDrinkQuantityId=${req.query.SoftDrinkQuantityId} ORDER BY StockId DESC`
  //     );
  //     res.json({ status: true, data: result.recordset });
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async getStockInMasterDataByResId(req, res) {
    try {
      if (!req.query.RestaurantId) throw "Please give the Restaurant Id";
      else {
        const pool = await poolPromise;
        let result = await pool
                        .request()
                        .input("RestaurantId",req.query.RestaurantId)
                        .execute("getStockInMasterDataByResId")
        if (result.recordset[0].mainData!=null){
          res.json({status: true, data:JSON.parse(result.recordset[0].mainData)})

        }
        else{
          res.json({status: true, message: []})
        }
        }
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }

  // async getStockInMasterDataByResId(req, res) {
  //   try {
  //     if (!req.query.RestaurantId) throw "Please give the Restaurant Id";
  //     const pool = await poolPromise;
  //     const result = await pool.query(
  //       `SELECT StockInMaster.StockId, StockInMaster.Date,StockInMaster.RestaurantId, StockInMaster.SoftDrinkId, SoftDrinkMaster.SoftDrinkName, StockInMaster.SoftDrinkQuantityId, ConfigurationMaster.ConfigName AS SoftDrinkQuantityName, ReceivedQty, IssuedQty, BalanceQty, Rate, TotalAmt, StockInMaster.CreatedBy, StockInMaster.CreatedDate, StockInMaster.UpdatedBy, StockInMaster.UpdatedDate FROM StockInMaster, SoftDrinkMaster, ConfigurationMaster WHERE StockInMaster.SoftDrinkId = SoftDrinkMaster.SoftDrinkId AND StockInMaster.SoftDrinkQuantityId = ConfigurationMaster.ConfigId AND StockInMaster.RestaurantId= ${req.query.RestaurantId}`
  //     );
  //     res.json({ status: true, data: result.recordset });
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async addData(req, res) {
    try {
      if (
        req.body.RestaurantId &&
        req.body.SoftDrinkId &&
        req.body.SoftDrinkQuantityId &&
        req.body.ReceivedQty &&
        req.body.Rate &&
        req.body.TotalAmt &&
        req.body.CreatedBy &&
        req.body.Date
      ) {
        const pool = await poolPromise;
        // let StockRes = await pool.query(
        //   `SELECT * FROM StockInMaster WHERE RestaurantId=${req.body.RestaurantId} AND SoftDrinkId=${req.body.SoftDrinkId} AND SoftDrinkQuantityId=${req.body.SoftDrinkQuantityId}`
        // );
        let configData = await pool.query(
          `SELECT ConfigName FROM ConfigurationMaster INNER JOIN ConfigurationType ON (ConfigurationType.TypeName='Soft Drink Quantity Type') AND ConfigurationMaster.TypeId = ConfigurationType.TypeId AND ConfigId= ${req.body.SoftDrinkQuantityId}`
        );
        let Quantityvalue = 0;
        if (configData.recordset.length > 0) {
          Quantityvalue = configData.recordset[0].ConfigName.match(
            /[\d\.]+|\D+/g
          );
          Quantityvalue = Quantityvalue.includes("ML")
            ? Quantityvalue[0]
            : Quantityvalue.includes(" ML")
            ? Quantityvalue[0]
            : Quantityvalue[0] * 1000;
        }
        // if (StockRes.recordset.length == 0) {
        let result = await pool
                    .request()
                    .input("RestaurantId", req.body.RestaurantId)
                    .input("SoftDrinkId", req.body.SoftDrinkId)
                    .input("SoftDrinkQuantityId",req.body.SoftDrinkQuantityId)
                    .input("Date",req.body.Date)
                    .input("Rate",req.body.Rate)
                    .input("ReceivedQty",req.body.ReceivedQty)
                    .input("IssuedQty",req.body.IssuedQty)
                    .input("BalanceQty",req.body.BalanceQty)
                    .input("TotalAmt",req.body.TotalAmt)
                    .input("CreatedBy",req.body.CreatedBy)
                    .execute("addStockinMasterData")
        if (result.recordset[0][""][1] == 1) {
        res.json({status: true, message:result.recordset[0][""][0]});
        }
        else {
        res.json({status: false, message:result.recordset[0][""][0]})
        }
        // } else {
        //   await pool
        //     .request()
        //     .input("RestaurantId", req.body.RestaurantId)
        //     .input("SoftDrinkId", req.body.SoftDrinkId)
        //     .input("SoftDrinkQuantityId", req.body.SoftDrinkQuantityId)
        //     .input(
        //       "ReceivedQty",
        //       req.body.ReceivedQty + StockRes.recordset[0].ReceivedQty
        //     )
        //     .input("IssuedQty", req.body.IssuedQty)
        //     .input(
        //       "BalanceQty",
        //       req.body.ReceivedQty + StockRes.recordset[0].BalanceQty
        //     )
        //     .input("Rate", req.body.Rate)
        //     .input(
        //       "TotalAmt",
        //       req.body.TotalAmt + StockRes.recordset[0].TotalAmt
        //     )
        //     .input("UpdatedBy", req.body.CreatedBy)
        //     .query(
        //       `UPDATE StockInMaster SET ReceivedQty=@ReceivedQty,BalanceQty=@BalanceQty,Rate=@Rate,TotalAmt=@TotalAmt,UpdatedBy=@UpdatedBy WHERE RestaurantId=@RestaurantId AND SoftDrinkQuantityId=@SoftDrinkQuantityId AND SoftDrinkId=@SoftDrinkId`
        //     );
        //   res.json({ status: true, message: "StockIn Updated successfully." });
        // }
      } else throw "Please fill all the details!";
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }

  // async addData(req, res) {
  //   try {
  //     if (
  //       req.body.RestaurantId &&
  //       req.body.SoftDrinkId &&
  //       req.body.SoftDrinkQuantityId &&
  //       req.body.ReceivedQty &&
  //       req.body.Rate &&
  //       req.body.TotalAmt &&
  //       req.body.CreatedBy &&
  //       req.body.Date
  //     ) {
  //       const pool = await poolPromise;
  //       // let StockRes = await pool.query(
  //       //   `SELECT * FROM StockInMaster WHERE RestaurantId=${req.body.RestaurantId} AND SoftDrinkId=${req.body.SoftDrinkId} AND SoftDrinkQuantityId=${req.body.SoftDrinkQuantityId}`
  //       // );
  //       let configData = await pool.query(
  //         `SELECT ConfigName FROM ConfigurationMaster INNER JOIN ConfigurationType ON (ConfigurationType.TypeName='Soft Drink Quantity Type') AND ConfigurationMaster.TypeId = ConfigurationType.TypeId AND ConfigId= ${req.body.SoftDrinkQuantityId}`
  //       );
  //       let Quantityvalue = 0;
  //       if (configData.recordset.length > 0) {
  //         Quantityvalue = configData.recordset[0].ConfigName.match(
  //           /[\d\.]+|\D+/g
  //         );
  //         Quantityvalue = Quantityvalue.includes("ML")
  //           ? Quantityvalue[0]
  //           : Quantityvalue.includes(" ML")
  //           ? Quantityvalue[0]
  //           : Quantityvalue[0] * 1000;
  //       }
  //       // if (StockRes.recordset.length == 0) {
  //         await pool
  //           .request()
  //           .input("RestaurantId", req.body.RestaurantId)
  //           .input("SoftDrinkId", req.body.SoftDrinkId)
  //           .input("SoftDrinkQuantityId", req.body.SoftDrinkQuantityId)
  //           .input("ReceivedQty", req.body.ReceivedQty)
  //           .input("IssuedQty", req.body.IssuedQty)
  //           .input("BalanceQty", req.body.BalanceQty)
  //           .input("Rate", req.body.Rate)
  //           .input("TotalAmt", req.body.TotalAmt)
  //           // .input("BalanceQtyMl", req.body.BalanceQtyMl)
  //           .input("CreatedBy", req.body.CreatedBy)
  //           .input("Date", req.body.Date)
  //           .query(
  //             `INSERT INTO StockInMaster (RestaurantId, SoftDrinkId, SoftDrinkQuantityId, ReceivedQty,IssuedQty,BalanceQty, Rate, TotalAmt, CreatedBy,Date) VALUES (@RestaurantId, @SoftDrinkId, @SoftDrinkQuantityId, @ReceivedQty,@IssuedQty,@BalanceQty, @Rate, @TotalAmt, @CreatedBy,@Date)`
  //           );
  //         res.json({ status: true, message: "StockIn added successfully." });
  //       // } else {
  //       //   await pool
  //       //     .request()
  //       //     .input("RestaurantId", req.body.RestaurantId)
  //       //     .input("SoftDrinkId", req.body.SoftDrinkId)
  //       //     .input("SoftDrinkQuantityId", req.body.SoftDrinkQuantityId)
  //       //     .input(
  //       //       "ReceivedQty",
  //       //       req.body.ReceivedQty + StockRes.recordset[0].ReceivedQty
  //       //     )
  //       //     .input("IssuedQty", req.body.IssuedQty)
  //       //     .input(
  //       //       "BalanceQty",
  //       //       req.body.ReceivedQty + StockRes.recordset[0].BalanceQty
  //       //     )
  //       //     .input("Rate", req.body.Rate)
  //       //     .input(
  //       //       "TotalAmt",
  //       //       req.body.TotalAmt + StockRes.recordset[0].TotalAmt
  //       //     )
  //       //     .input("UpdatedBy", req.body.CreatedBy)
  //       //     .query(
  //       //       `UPDATE StockInMaster SET ReceivedQty=@ReceivedQty,BalanceQty=@BalanceQty,Rate=@Rate,TotalAmt=@TotalAmt,UpdatedBy=@UpdatedBy WHERE RestaurantId=@RestaurantId AND SoftDrinkQuantityId=@SoftDrinkQuantityId AND SoftDrinkId=@SoftDrinkId`
  //       //     );
  //       //   res.json({ status: true, message: "StockIn Updated successfully." });
  //       // }
  //     } else throw "Please fill all the details!";
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async updateData(req, res) {
    try {
      if (req.body.StockId && req.body.UpdatedBy) {
        const pool = await poolPromise;
        let objArr = utility.removeEmptyObjects(req.body);
        let queryValue = null;
        for (const [key, value] of Object.entries(objArr)) {
          if (key != "StockId")
            queryValue == null
              ? (queryValue = `${key}=@${key}`)
              : (queryValue += `,${key}=@${key}`);
        }

        let configData = await pool.query(
          `SELECT ConfigName FROM ConfigurationMaster INNER JOIN ConfigurationType ON (ConfigurationType.TypeName='Beverage Type' OR ConfigurationType.TypeName='Soft Drink Quantity Type') AND ConfigurationMaster.TypeId = ConfigurationType.TypeId AND ConfigId= ${req.body.SoftDrinkQuantityId}`
        );
        let Quantityvalue = 0;
        if (configData.recordset.length > 0) {
          Quantityvalue = configData.recordset[0].ConfigName.match(
            /[\d\.]+|\D+/g
          );
          Quantityvalue = Quantityvalue.includes("ML")
            ? Quantityvalue[0]
            : Quantityvalue.includes(" ML")
            ? Quantityvalue[0]
            : Quantityvalue[0] * 1000;
        }
        let result = await pool
                    .request()
                    .input("StockId",req.body.StockId)
                    .input("RestaurantId", req.body.RestaurantId)
                    .input("SoftDrinkId", req.body.SoftDrinkId)
                    .input("SoftDrinkQuantityId", req.body.SoftDrinkQuantityId)
                    .input("ReceivedQty", req.body.ReceivedQty)
                    .input("IssuedQty", req.body.IssuedQty)
                    .input("BalanceQty", req.body.BalanceQty)
                    .input("Rate", req.body.Rate)
                    .input("TotalAmt", req.body.TotalAmt)
                    .input("UpdatedBy", req.body.UpdatedBy)
                    .execute("updateStockInMasterData")
        if (result.recordset[0][""][1] == 1) {
        res.json({status: true, message:result.recordset[0][""][0]});
        }
        else {
        res.json({status: false, message:result.recordset[0][""][0]})
        }
      } else throw "Please fill all the details!";
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }

  // async updateData(req, res) {
  //   try {
  //     if (req.body.StockId && req.body.UpdatedBy) {
  //       const pool = await poolPromise;
  //       let objArr = utility.removeEmptyObjects(req.body);
  //       let queryValue = null;
  //       for (const [key, value] of Object.entries(objArr)) {
  //         if (key != "StockId")
  //           queryValue == null
  //             ? (queryValue = `${key}=@${key}`)
  //             : (queryValue += `,${key}=@${key}`);
  //       }

  //       let configData = await pool.query(
  //         `SELECT ConfigName FROM ConfigurationMaster INNER JOIN ConfigurationType ON (ConfigurationType.TypeName='Beverage Type' OR ConfigurationType.TypeName='Soft Drink Quantity Type') AND ConfigurationMaster.TypeId = ConfigurationType.TypeId AND ConfigId= ${req.body.SoftDrinkQuantityId}`
  //       );
  //       let Quantityvalue = 0;
  //       if (configData.recordset.length > 0) {
  //         Quantityvalue = configData.recordset[0].ConfigName.match(
  //           /[\d\.]+|\D+/g
  //         );
  //         Quantityvalue = Quantityvalue.includes("ML")
  //           ? Quantityvalue[0]
  //           : Quantityvalue.includes(" ML")
  //           ? Quantityvalue[0]
  //           : Quantityvalue[0] * 1000;
  //       }
  //       await pool
  //         .request()
  //         .input("RestaurantId", req.body.RestaurantId)
  //         .input("SoftDrinkQuantityId", req.body.SoftDrinkQuantityId)
  //         .input("SoftDrinkId", req.body.SoftDrinkId)
  //         .input("ReceivedQty", req.body.ReceivedQty)
  //         .input("IssuedQty", req.body.IssuedQty)
  //         .input("BalanceQty", req.body.BalanceQty)
  //         .input("Rate", req.body.Rate)
  //         .input("TotalAmt", req.body.TotalAmt)
  //         .input("UpdatedBy", req.body.UpdatedBy)
  //         .query(
  //           `UPDATE StockInMaster SET ${queryValue} WHERE StockId = ${req.body.StockId}`
  //         );
  //       res.json({ status: true, message: "StockIn updated successfully." });
  //     } else throw "Please fill all the details!";
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  // async deleteData(req, res) {
  //   try {
  //     if (req.query.StockId && req.query.ActiveStatus) {
  //       const pool = await poolPromise;
  //       await pool
  //         .request()
  //         .input("StockId", req.query.StockId)
  //         .input("ActiveStatus", req.query.ActiveStatus)
  //         .query(
  //           "UPDATE StockInMaster SET ActiveStatus = @ActiveStatus  WHERE StockId = @StockId"
  //         );
  //       res.json({ status: true, message: "Deleted successfully." });
  //     } else throw "Please fill all the details!";
  //   } catch (error) {
  //     errorHandle.handleError(error, (errorRes) => {
  //       res.send(errorRes);
  //     });
  //   }
  // }
}

const stockInMaster = new StockInMasterController();

module.exports = stockInMaster;
