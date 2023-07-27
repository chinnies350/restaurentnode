const errorHandle = require("../services/errorHandler");
const commonMsgs = require("../CommonMsg.json");
const { poolPromise, sql } = require("../db");

class FoodQuantityMasterController {

  async getData(req, res) {
    try {
      if (!req.query.FoodId) res.json(commonMsgs.NullMsg);
      else {
        const pool = await poolPromise;
        let result = await pool
                        .request()
                        .input("FoodId", req.query.FoodId)
                        .execute("getFoodQuantityData")
        if (result.recordset[0].mainData!=null){
          res.json({status: true, data:JSON.parse(result.recordset[0].mainData)})

        }
        else{
          res.json({status: true, data: []})
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
  //     if (!req.query.FoodId) res.json(commonMsgs.NullMsg);
  //     else {
  //       const pool = await poolPromise;
  //       let result = await pool.query(
  //         `select * from FoodQuantityMaster where FoodId= ${req.query.FoodId} AND ActiveStatus='A'`
  //       );
  //       res.json({ status: true, data: result.recordset });
  //     }
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async getQuantityDataByFoodId(req, res) {
    try {
      if (!req.query.FoodId) res.json(commonMsgs.NullMsg);
      else {
        const pool = await poolPromise;
        let result = await pool
                        .request()
                        .input("FoodId", req.query.FoodId)
                        .execute("getQuantityDataByFoodId")
        if (result.recordset[0].mainData!=null){
          res.json({status: true, data:JSON.parse(result.recordset[0].mainData)})

        }
        else{
          res.json({status: true, data: []})
        }
        }
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }
  // async getQuantityDataByFoodId(req, res) {
  //   try {
  //     if (!req.query.FoodId) res.json(commonMsgs.NullMsg);
  //     else {
  //       const pool = await poolPromise;
  //       let result = await pool.query(
  //         `select fqm.* ,cm.ConfigName AS FoodQuantityName
  //         from FoodQuantityMaster AS fqm
  //         INNER JOIN ConfigurationMaster AS cm
  //         ON cm.ConfigId=fqm.FoodQuantityId
  //         where fqm.FoodId= ${req.query.FoodId} AND fqm.ActiveStatus='A'`
  //       );
  //       res.json({ status: true, data: result.recordset });
  //     }
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async getAllData(req, res) {
    try {
        const pool = await poolPromise;
        let result = await pool
                        .request()
                        .execute("getAllFoodQuantityData")
        if (result.recordset[0].mainData!=null){
          res.json({status: true, data:JSON.parse(result.recordset[0].mainData)})

        }
        else{
          res.json({status: true, data:[]})
        }
     
    } 
    catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }

  // async getAllData(req, res) {
  //   try {
  //     const pool = await poolPromise;
  //     let result = await pool.query(
  //       `select FoodQuantityMaster.FoodId, FoodMaster.FoodName, FoodQuantityMaster.FoodQuantityId, ConfigurationMaster.ConfigName As FoodQuantityName, FoodQuantityMaster.ActiveStatus, FoodQuantityMaster.Tariff,FoodQuantityMaster.CreatedBy, FoodQuantityMaster.CreatedDate, FoodQuantityMaster.UpdatedBy, FoodQuantityMaster.UpdatedDate From FoodQuantityMaster, ConfigurationMaster, FoodMaster WHERE FoodQuantityMaster.FoodQuantityId = ConfigurationMaster.ConfigId AND FoodQuantityMaster.FoodId = FoodMaster.FoodId`
  //     );
  //     let response = await pool.query(
  //       `select FoodQuantityMaster.FoodId, FoodMaster.FoodName, FoodQuantityMaster.FoodQuantityId,  FoodQuantityMaster.ActiveStatus, FoodQuantityMaster.Tariff,FoodQuantityMaster.CreatedBy, FoodQuantityMaster.CreatedDate, FoodQuantityMaster.UpdatedBy, FoodQuantityMaster.UpdatedDate From FoodQuantityMaster, FoodMaster WHERE FoodQuantityMaster.FoodId = FoodMaster.FoodId AND FoodQuantityMaster.FoodQuantityId IS NULL`
  //     );
  //     res.json({
  //       status: true,
  //       data: [...result.recordset, ...response.recordset]
  //     });
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async getFoodQuantityDataByResId(req, res) {
    try {
      if (!req.query.RestaurantId) return res.json(commonMsgs.NullMsg);
      else {
        const pool = await poolPromise;
        let result = await pool
                        .request()
                        .input("RestaurantId", req.query.RestaurantId)
                        .execute("getFoodQuantityDataByResId")
        if (result.recordset[0].mainData!=null){
          res.json({status: true, data:JSON.parse(result.recordset[0].mainData)})

        }
        else{
          res.json({status: true, data: []})
        }
        }
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }

  // async getFoodQuantityDataByResId(req, res) {
  //   try {
  //     if (!req.query.RestaurantId) return res.json(commonMsgs.NullMsg);
  //     else {
  //       const pool = await poolPromise;
  //       let result = await pool.query(
  //         `select FoodQuantityMaster.UniqueId,FoodQuantityMaster.FoodCategoryId, FoodCategoryMaster.FoodCategoryName, FoodQuantityMaster.FoodId, FoodMaster.FoodName, FoodQuantityMaster.FoodQuantityId, ConfigurationMaster.ConfigName As FoodQuantityName, FoodQuantityMaster.ActiveStatus, FoodQuantityMaster.Tariff,FoodQuantityMaster.CreatedBy, FoodQuantityMaster.CreatedDate, FoodQuantityMaster.UpdatedBy, FoodQuantityMaster.UpdatedDate FROM  FoodCategoryMaster,FoodQuantityMaster, ConfigurationMaster, FoodMaster WHERE FoodQuantityMaster.FoodQuantityId = ConfigurationMaster.ConfigId AND FoodQuantityMaster.FoodId = FoodMaster.FoodId AND FoodQuantityMaster.RestaurantId = ${req.query.RestaurantId} AND FoodMaster.RestaurantId = ${req.query.RestaurantId} AND FoodCategoryMaster.FoodCategoryId = FoodQuantityMaster.FoodCategoryId`
  //       );
  //       let response = await pool.query(
  //         `select FoodQuantityMaster.UniqueId,FoodCategoryMaster.FoodCategoryId, FoodCategoryMaster.FoodCategoryName, FoodQuantityMaster.FoodId, FoodMaster.FoodName, FoodQuantityMaster.FoodQuantityId,  FoodQuantityMaster.ActiveStatus, FoodQuantityMaster.Tariff,FoodQuantityMaster.CreatedBy, FoodQuantityMaster.CreatedDate, FoodQuantityMaster.UpdatedBy, FoodQuantityMaster.UpdatedDate FROM FoodCategoryMaster, FoodQuantityMaster, FoodMaster WHERE FoodQuantityMaster.FoodId = FoodMaster.FoodId AND FoodQuantityMaster.FoodQuantityId IS NULL AND FoodQuantityMaster.RestaurantId = ${req.query.RestaurantId} AND FoodMaster.RestaurantId = ${req.query.RestaurantId} AND FoodCategoryMaster.FoodCategoryId = FoodQuantityMaster.FoodCategoryId`
  //       );
  //       res.json({
  //         status: true,
  //         data: [...result.recordset, ...response.recordset]
  //       });
  //     }
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async getTariffByFoodId(req, res) {
    try {
      if (!req.query.hasOwnProperty("FoodId"))
        throw "Please provide all the details!.";
      else {
        const pool = await poolPromise;
        let result = await pool
                        .request()
                        .input("FoodId", req.query.FoodId)
                        .execute("getTariffByFoodId")
        if (result.recordset[0].mainData!=null){
          res.json({status: true, data:JSON.parse(result.recordset[0].mainData)})

        }
        else{
          res.json({status: true, data: []})
        }
        }
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }

  // async getTariffByFoodId(req, res) {
  //   try {
  //     if (!req.query.hasOwnProperty("FoodId"))
  //       throw "Please provide all the details!.";
  //     const pool = await poolPromise;
  //     const result = await pool
  //       .request()
  //       .input("FoodId", req.query.FoodId)
  //       .query(
  //         `SELECT FoodQuantityMaster.FoodId, FoodQuantityMaster.Tariff, ConfigurationMaster.ConfigId AS FoodQuantityId, ConfigurationMaster.ConfigName AS FoodQuantityName, FoodQuantityMaster.ActiveStatus, FoodQuantityMaster.CreatedBy, FoodQuantityMaster.CreatedDate, FoodQuantityMaster.UpdatedBy, FoodQuantityMaster.UpdatedDate FROM FoodQuantityMaster INNER JOIN FoodMaster ON FoodQuantityMaster.FoodId = FoodMaster.FoodId INNER JOIN ConfigurationMaster ON FoodQuantityMaster.FoodQuantityId = ConfigurationMaster.ConfigId where FoodQuantityMaster.FoodId = @FoodId AND FoodQuantityMaster.ActiveStatus = 'A'`
  //       );
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
        !(
          req.body.RestaurantId &&
          req.body.FoodId &&
          req.body.Tariff &&
          req.body.CreatedBy
        )
      )
        res.json(commonMsgs.NullMsg);
      else {
          const pool = await poolPromise;
          let result = await pool
                          .request()
                          .input("FoodId", req.body.FoodId)
                          .input("FoodQuantityId", req.body.FoodQuantityId)
                          .input("CreatedBy",req.body.CreatedBy)
                          .input("Tariff",req.body.Tariff)
                          .input("RestaurantId",req.body.RestaurantId)
                          .input("FoodCategoryId",req.body.FoodCategoryId)
                          .execute("addFoodQuantityData")
          if (result.recordset[0][""][1] == 1) {
            res.json(commonMsgs.AddMsg);
          }
          else {
            res.json({status: false, message:result.recordset[0][""][0]})
          }
          }
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }

  // async addData(req, res) {
  //   try {
  //     if (
  //       !(
  //         req.body.RestaurantId &&
  //         req.body.FoodId &&
  //         req.body.Tariff &&
  //         req.body.CreatedBy
  //       )
  //     )
  //       res.json(commonMsgs.NullMsg);
  //     else {
  //       checkDataExist(req.body, async response => {
  //         if (response.length > 0) {
  //           res.json(commonMsgs.DuplicateRecordMsg);
  //         } else {
  //           var queryStr = "ActiveStatus",
  //             queryValues = "'A'";
  //           for (var key in req.body) {
  //             if (queryStr != "") {
  //               queryStr += ", ";
  //               queryValues += ", ";
  //             }
  //             queryStr += key;
  //             queryValues += req.body[key];
  //           }
  //           const pool = await poolPromise;
  //           if (!req.body.hasOwnProperty("FoodQuantityId")) {
  //             queryStr += ", FoodQuantityId";
  //             queryValues += ", " + `NULL`;
  //           }
  //           let result = await pool.query(
  //             `INSERT INTO FoodQuantityMaster(${queryStr}) VALUES(${queryValues})`
  //           );
  //           res.json(commonMsgs.AddMsg);
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async updateData(req, res) {
    try {
      const { FoodId, UpdatedBy, RestaurantId, FoodQuantityId,UniqueId } = req.body;
      if (!FoodId || !RestaurantId || !UpdatedBy)
        return res.json(commonMsgs.NullMsg);
        else {
          const pool = await poolPromise;
          let result = await pool
                          .request()
                          .input("UniqueId", req.body.UniqueId)
                          .input("FoodId",req.body.FoodId)
                          .input("FoodQuantityId",req.body.FoodQuantityId)
                          .input("UpdatedBy",req.body.UpdatedBy)
                          .input("Tariff",req.body.Tariff)
                          .input("RestaurantId",req.body.RestaurantId)
                          .input("FoodCategoryId",req.body.FoodCategoryId)
                          .execute("updateFoodQuantityData")
          if (result.recordset[0][""][1] == 1) {
            res.json(commonMsgs.updateMsg);
          }
          else {
            res.json({status: false, message:result.recordset[0][""][0]})
          }
          }      
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }

  // async updateData(req, res) {
  //   try {
  //     const { FoodId, UpdatedBy, RestaurantId, FoodQuantityId,UniqueId } = req.body;
  //     if (!FoodId || !RestaurantId || !UpdatedBy)
  //       return res.json(commonMsgs.NullMsg);
  //     let queryValue = null;
  //     for (const [key, value] of Object.entries(req.body)) {
  //       // if (key != "FoodQuantityId" || key != "FoodId")
  //       if (key != "FoodId" && key != "UniqueId")
  //         queryValue == null
  //           ? (queryValue = `${key}='${value}'`)
  //           : (queryValue += `,${key}='${value}'`);
  //     }
  //     const pool = await poolPromise;
  //    let result=await pool.query(
  //       `
  //          UPDATE FoodQuantityMaster SET ${queryValue}, UpdatedDate = GETDATE()  WHERE FoodId = ${FoodId} AND RestaurantId = ${RestaurantId} AND UniqueId=${UniqueId}
  //         `
  //     );
     
  //   //   await pool.query(
  //   //     `BEGIN
  //   //     IF NOT EXISTS (select * from FoodQuantityMaster where FoodId = ${FoodId} AND RestaurantId = ${RestaurantId} and FoodQuantityId !=${FoodQuantityId})
  //   //       BEGIN
  //   //         UPDATE FoodQuantityMaster SET ${queryValue}, UpdatedDate = GETDATE()  WHERE FoodId = ${FoodId} AND RestaurantId = ${RestaurantId}
  //   //       END
  //   // END`
  //   //   );
  //   if(result.rowsAffected.length!=0){
  //     res.json(commonMsgs.updateMsg);
  //   }
  //   else{
  //     res.json({ status: false, message: "Data Not Update" });
  //   }

      
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }

  async deleteData(req, res) {
    try {
      if (
        !req.query.hasOwnProperty("FoodId") ||
        !req.query.hasOwnProperty("ActiveStatus")
      )
        return res.json(commonMsgs.NullMsg);
      else {
          const pool = await poolPromise;
          let result = await pool
                          .request()
                          .input("ActiveStatus", req.query.ActiveStatus)
                          .input("FoodId", req.query.FoodId)
                          .input("UniqueId",req.query.UniqueId)
                          .execute("deleteFoodQuantityData")
          if (result.recordset[0][""][1] == 1) {
            res.json(commonMsgs.deleteMsg);
          }
          else {
            res.json({status: false, message:result.recordset[0][""][0]})
          }
          }
    } catch (error) {
      errorHandle.handleError(error, errorRes => {
        res.send(errorRes);
      });
    }
  }

  // async deleteData(req, res) {
  //   try {
  //     if (
  //       !req.query.hasOwnProperty("FoodId") ||
  //       !req.query.hasOwnProperty("ActiveStatus")
  //     )
  //       return res.json(commonMsgs.NullMsg);
  //     const pool = await poolPromise;
  //     // if (req.query.hasOwnProperty("FoodQuantityId")) {
  //       await pool.query(
  //         `UPDATE FoodQuantityMaster SET ActiveStatus = '${req.query.ActiveStatus}'  WHERE FoodId = '${req.query.FoodId}' AND UniqueId=${req.query.UniqueId}`
  //       );
  //       checkFoodQuantity(req.query.FoodId, async response => {
  //         res.json(commonMsgs.deleteMsg);
  //       });
  //       return;
  //     // } else {
  //     //   await pool.query(
  //     //     `UPDATE FoodQuantityMaster SET ActiveStatus = '${req.query.ActiveStatus}'  WHERE FoodId = '${req.query.FoodId}' AND UniqueId=${req.query.UniqueId};UPDATE FoodMaster SET ActiveStatus = '${req.query.ActiveStatus}'  WHERE FoodId = '${req.query.FoodId}' `
  //     //   );
  //     //   res.json(commonMsgs.deleteMsg);
  //     //   return;
  //     // }
  //   } catch (error) {
  //     errorHandle.handleError(error, errorRes => {
  //       res.send(errorRes);
  //     });
  //   }
  // }
}

async function checkDataExist(input, callback) {
  const pool = await poolPromise;
  if (input.hasOwnProperty("FoodQuantityId")) {
    let result = await pool
      .request()
      .query(
        `SELECT FoodQuantityMaster.RestaurantId, FoodQuantityMaster.FoodId, FoodQuantityMaster.FoodQuantityId FROM FoodQuantityMaster WHERE RestaurantId=${input.RestaurantId} AND FoodId = ${input.FoodId} AND FoodQuantityId=${input.FoodQuantityId}`
      );
    callback(result.recordset);
    return;
  } else {
    let result = await pool
      .request()
      .query(
        `SELECT FoodQuantityMaster.RestaurantId, FoodQuantityMaster.FoodId, FoodQuantityMaster.FoodQuantityId FROM FoodQuantityMaster WHERE RestaurantId=${input.RestaurantId} AND FoodId = ${input.FoodId} AND FoodQuantityId IS NULL`
      );
    callback(result.recordset);
  }
}

async function checkFoodQuantity(FoodId, callback) {
  const pool = await poolPromise;
  let result = await pool
    .request()
    .query(
      `SELECT FoodQuantityMaster.FoodId, FoodQuantityMaster.FoodQuantityId, FoodQuantityMaster.ActiveStatus FROM FoodQuantityMaster WHERE FoodId = ${FoodId} AND ActiveStatus='A'`
    );
  if (result.recordset.length === 0) {
    let result = await pool
      .request()
      .query(
        `UPDATE FoodMaster SET ActiveStatus = 'D' WHERE FoodId = '${FoodId}'`
      );
  }
  callback(null);
}

const FoodQuantityMaster = new FoodQuantityMasterController();

module.exports = FoodQuantityMaster;















// const errorHandle = require("../services/errorHandler");
// const commonMsgs = require("../CommonMsg.json");
// const { poolPromise, sql } = require("../db");

// class FoodQuantityMasterController {
//   async getData(req, res) {
//     try {
//       if (!req.query.FoodId) res.json(commonMsgs.NullMsg);
//       else {
//         const pool = await poolPromise;
//         let result = await pool.query(
//           `select * from FoodQuantityMaster where FoodId= ${req.query.FoodId} AND ActiveStatus='A'`
//         );
//         res.json({ status: true, data: result.recordset });
//       }
//     } catch (error) {
//       errorHandle.handleError(error, errorRes => {
//         res.send(errorRes);
//       });
//     }
//   }

//   async getAllData(req, res) {
//     try {
//       const pool = await poolPromise;
//       let result = await pool.query(
//         `select FoodQuantityMaster.FoodId, FoodMaster.FoodName, FoodQuantityMaster.FoodQuantityId, ConfigurationMaster.ConfigName As FoodQuantityName, FoodQuantityMaster.ActiveStatus, FoodQuantityMaster.Tariff,FoodQuantityMaster.CreatedBy, FoodQuantityMaster.CreatedDate, FoodQuantityMaster.UpdatedBy, FoodQuantityMaster.UpdatedDate From FoodQuantityMaster, ConfigurationMaster, FoodMaster WHERE FoodQuantityMaster.FoodQuantityId = ConfigurationMaster.ConfigId AND FoodQuantityMaster.FoodId = FoodMaster.FoodId`
//       );
//       let response = await pool.query(
//         `select FoodQuantityMaster.FoodId, FoodMaster.FoodName, FoodQuantityMaster.FoodQuantityId,  FoodQuantityMaster.ActiveStatus, FoodQuantityMaster.Tariff,FoodQuantityMaster.CreatedBy, FoodQuantityMaster.CreatedDate, FoodQuantityMaster.UpdatedBy, FoodQuantityMaster.UpdatedDate From FoodQuantityMaster, FoodMaster WHERE FoodQuantityMaster.FoodId = FoodMaster.FoodId AND FoodQuantityMaster.FoodQuantityId IS NULL`
//       );
//       res.json({
//         status: true,
//         data: [...result.recordset, ...response.recordset]
//       });
//     } catch (error) {
//       errorHandle.handleError(error, errorRes => {
//         res.send(errorRes);
//       });
//     }
//   }

//   async getFoodQuantityDataByResId(req, res) {
//     try {
//       if (!req.query.RestaurantId) return res.json(commonMsgs.NullMsg);
//       else {
//         const pool = await poolPromise;
//         let result = await pool.query(
//           `select FoodQuantityMaster.FoodCategoryId, FoodCategoryMaster.FoodCategoryName, FoodQuantityMaster.FoodId, FoodMaster.FoodName, FoodQuantityMaster.FoodQuantityId, ConfigurationMaster.ConfigName As FoodQuantityName, FoodQuantityMaster.ActiveStatus, FoodQuantityMaster.Tariff,FoodQuantityMaster.CreatedBy, FoodQuantityMaster.CreatedDate, FoodQuantityMaster.UpdatedBy, FoodQuantityMaster.UpdatedDate FROM  FoodCategoryMaster,FoodQuantityMaster, ConfigurationMaster, FoodMaster WHERE FoodQuantityMaster.FoodQuantityId = ConfigurationMaster.ConfigId AND FoodQuantityMaster.FoodId = FoodMaster.FoodId AND FoodQuantityMaster.RestaurantId = ${req.query.RestaurantId} AND FoodMaster.RestaurantId = ${req.query.RestaurantId} AND FoodCategoryMaster.FoodCategoryId = FoodQuantityMaster.FoodCategoryId`
//         );
//         let response = await pool.query(
//           `select FoodCategoryMaster.FoodCategoryId, FoodCategoryMaster.FoodCategoryName, FoodQuantityMaster.FoodId, FoodMaster.FoodName, FoodQuantityMaster.FoodQuantityId,  FoodQuantityMaster.ActiveStatus, FoodQuantityMaster.Tariff,FoodQuantityMaster.CreatedBy, FoodQuantityMaster.CreatedDate, FoodQuantityMaster.UpdatedBy, FoodQuantityMaster.UpdatedDate FROM FoodCategoryMaster, FoodQuantityMaster, FoodMaster WHERE FoodQuantityMaster.FoodId = FoodMaster.FoodId AND FoodQuantityMaster.FoodQuantityId IS NULL AND FoodQuantityMaster.RestaurantId = ${req.query.RestaurantId} AND FoodMaster.RestaurantId = ${req.query.RestaurantId} AND FoodCategoryMaster.FoodCategoryId = FoodQuantityMaster.FoodCategoryId`
//         );
//         res.json({
//           status: true,
//           data: [...result.recordset, ...response.recordset]
//         });
//       }
//     } catch (error) {
//       errorHandle.handleError(error, errorRes => {
//         res.send(errorRes);
//       });
//     }
//   }

//   async getTariffByFoodId(req, res) {
//     try {
//       if (!req.query.hasOwnProperty("FoodId"))
//         throw "Please provide all the details!.";
//       const pool = await poolPromise;
//       const result = await pool
//         .request()
//         .input("FoodId", req.query.FoodId)
//         .query(
//           `SELECT FoodQuantityMaster.FoodId, FoodQuantityMaster.Tariff, ConfigurationMaster.ConfigId AS FoodQuantityId, ConfigurationMaster.ConfigName AS FoodQuantityName, FoodQuantityMaster.ActiveStatus, FoodQuantityMaster.CreatedBy, FoodQuantityMaster.CreatedDate, FoodQuantityMaster.UpdatedBy, FoodQuantityMaster.UpdatedDate FROM FoodQuantityMaster INNER JOIN FoodMaster ON FoodQuantityMaster.FoodId = FoodMaster.FoodId INNER JOIN ConfigurationMaster ON FoodQuantityMaster.FoodQuantityId = ConfigurationMaster.ConfigId where FoodQuantityMaster.FoodId = @FoodId AND FoodQuantityMaster.ActiveStatus = 'A'`
//         );
//       res.json({ status: true, data: result.recordset });
//     } catch (error) {
//       errorHandle.handleError(error, errorRes => {
//         res.send(errorRes);
//       });
//     }
//   }

//   async addData(req, res) {
//     try {
//       if (
//         !(
//           req.body.RestaurantId &&
//           req.body.FoodId &&
//           req.body.Tariff &&
//           req.body.CreatedBy
//         )
//       )
//         res.json(commonMsgs.NullMsg);
//       else {
//         checkDataExist(req.body, async response => {
//           if (response.length > 0) {
//             res.json(commonMsgs.DuplicateRecordMsg);
//           } else {
//             var queryStr = "ActiveStatus",
//               queryValues = "'A'";
//             for (var key in req.body) {
//               if (queryStr != "") {
//                 queryStr += ", ";
//                 queryValues += ", ";
//               }
//               queryStr += key;
//               queryValues += req.body[key];
//             }
//             const pool = await poolPromise;
//             if (!req.body.hasOwnProperty("FoodQuantityId")) {
//               queryStr += ", FoodQuantityId";
//               queryValues += ", " + `NULL`;
//             }
//             let result = await pool.query(
//               `INSERT INTO FoodQuantityMaster(${queryStr}) VALUES(${queryValues})`
//             );
//             res.json(commonMsgs.AddMsg);
//           }
//         });
//       }
//     } catch (error) {
//       errorHandle.handleError(error, errorRes => {
//         res.send(errorRes);
//       });
//     }
//   }

//   async updateData(req, res) {
//     try {
//       const { FoodId, UpdatedBy, RestaurantId, FoodQuantityId } = req.body;
//       const pool = await poolPromise;
//       if (!FoodId || !RestaurantId || !UpdatedBy)
//         return res.json(commonMsgs.NullMsg);
//       let queryValue = null;
//       for (const [key, value] of Object.entries(req.body)) {
//         // if (key != "FoodQuantityId" || key != "FoodId")
//         if ( key != "FoodId")

//           queryValue == null
//             ? (queryValue = `${key}='${value}'`)
//             : (queryValue += `,${key}='${value}'`);
//       }
      
//   //     `BEGIN
//   //     IF NOT EXISTS (select * from FoodQuantityMaster where FoodId = ${FoodId} AND RestaurantId = ${RestaurantId} and FoodQuantityId =${FoodQuantityId})
//   //       BEGIN
//   //         UPDATE FoodQuantityMaster SET ${queryValue}, UpdatedDate = GETDATE()  WHERE FoodId = ${FoodId} AND RestaurantId = ${RestaurantId}
//   //       END
//   // END`
//       await pool.query(
//         `
//             UPDATE FoodQuantityMaster SET ${queryValue}, UpdatedDate = GETDATE()  WHERE FoodId = ${FoodId} AND RestaurantId = ${RestaurantId} AND FoodQuantityId =${FoodQuantityId}
//           `
//       );
//       res.json(commonMsgs.updateMsg);
//     } catch (error) {
//       errorHandle.handleError(error, errorRes => {
//         res.send(errorRes);
//       });
//     }
//   }

//   async deleteData(req, res) {
//     try {
//       if (
//         !req.query.hasOwnProperty("FoodId") ||
//         !req.query.hasOwnProperty("ActiveStatus")
//       )
//         return res.json(commonMsgs.NullMsg);
//       const pool = await poolPromise;
//       if (req.query.hasOwnProperty("FoodQuantityId")) {
//         await pool.query(
//           `UPDATE FoodQuantityMaster SET ActiveStatus = '${req.query.ActiveStatus}'  WHERE FoodQuantityId = '${req.query.FoodQuantityId}' AND FoodId = '${req.query.FoodId}'`
//         );
//         checkFoodQuantity(req.query.FoodId, async response => {
//           res.json(commonMsgs.deleteMsg);
//         });
//         return;
//       } else {
//         await pool.query(
//           `UPDATE FoodQuantityMaster SET ActiveStatus = '${req.query.ActiveStatus}'  WHERE FoodId = '${req.query.FoodId}';UPDATE FoodMaster SET ActiveStatus = '${req.query.ActiveStatus}'  WHERE FoodId = '${req.query.FoodId}'`
//         );
//         res.json(commonMsgs.deleteMsg);
//         return;
//       }
//     } catch (error) {
//       errorHandle.handleError(error, errorRes => {
//         res.send(errorRes);
//       });
//     }
//   }
// }

// async function checkDataExist(input, callback) {
//   const pool = await poolPromise;
//   if (input.hasOwnProperty("FoodQuantityId")) {
//     let result = await pool
//       .request()
//       .query(
//         `SELECT FoodQuantityMaster.RestaurantId, FoodQuantityMaster.FoodId, FoodQuantityMaster.FoodQuantityId FROM FoodQuantityMaster WHERE RestaurantId=${input.RestaurantId} AND FoodId = ${input.FoodId} AND FoodQuantityId=${input.FoodQuantityId}`
//       );
//     callback(result.recordset);
//     return;
//   } else {
//     let result = await pool
//       .request()
//       .query(
//         `SELECT FoodQuantityMaster.RestaurantId, FoodQuantityMaster.FoodId, FoodQuantityMaster.FoodQuantityId FROM FoodQuantityMaster WHERE RestaurantId=${input.RestaurantId} AND FoodId = ${input.FoodId} AND FoodQuantityId IS NULL`
//       );
//     callback(result.recordset);
//   }
// }

// async function checkFoodQuantity(FoodId, callback) {
//   const pool = await poolPromise;
//   let result = await pool
//     .request()
//     .query(
//       `SELECT FoodQuantityMaster.FoodId, FoodQuantityMaster.FoodQuantityId, FoodQuantityMaster.ActiveStatus FROM FoodQuantityMaster WHERE FoodId = ${FoodId} AND ActiveStatus='A'`
//     );
//   if (result.recordset.length === 0) {
//     let result = await pool
//       .request()
//       .query(
//         `UPDATE FoodMaster SET ActiveStatus = 'D' WHERE FoodId = '${FoodId}'`
//       );
//   }
//   callback(null);
// }

// const FoodQuantityMaster = new FoodQuantityMasterController();

// module.exports = FoodQuantityMaster;
