// content.route.js
import { Router } from "express";
import {
    getSocialNetworks,
    getBookData,
    getCompaniesData,
    getSomeSectionsData,
    getEditorsData,
    getBasicUsersUnifiedData,
    getBasicEntitiesInfoData,
    getSectionsInfoData,
    sendNewEntity,
    sendNewSection,
    sendUpdateSection,
    sendDeleteSection,
    sendDeleteEntity,
    getMoreBasicEntityInfoData,
    sendUpdateEntity,
    countriesAndStates,
} from "../controllers/content.controller.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

/* router.get("/", getHomePageData); */
router.get("/book", getBookData);
router.get("/companies", getCompaniesData);
router.get("/sections", getSomeSectionsData);
router.get("/editors", getEditorsData);
router.get("/social-networks", getSocialNetworks);

router.get("/getUserDataList", getBasicUsersUnifiedData);
router.get("/getEntitiesDataList", getBasicEntitiesInfoData);
router.get("/getEntityData/:id", getMoreBasicEntityInfoData);
router.get("/getSectionsList", getSectionsInfoData);


router.get("/getCountriesAndStates", countriesAndStates)
router.post("/newEntity", upload.none() ,sendNewEntity)
router.put("/updateEntity/:id", upload.none() ,sendUpdateEntity)
router.post("/newSection",  upload.single('image'),sendNewSection)
router.post("/updateSection",  upload.single('image'),sendUpdateSection)
router.delete("/deleteSection/:id", sendDeleteSection);
router.delete("/deleteEntity/:id", sendDeleteEntity);


export default router;
