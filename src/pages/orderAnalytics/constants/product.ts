type Items = { [key: string]: string[] };

export class ProductGroup {
  static items: Items = {
    WHITE_KAUDI_51_PCS: ["SSK004001"],
    YELLOW_KAUDI_11_PCS: ["SSKD001011"],
    YELLOW_KAUDI_21_PCS: ["SSYK001021", "SSYK002021", "SSYC001021"],
    WHITE_KAUDI_21_PCS: ["SSWK001021"],
    BHOJPATRA_BIG_5: ["SS003005", "SS001011"],
    BHOJPATRA_SMALL_10: ["SSBP001010"],
    BHOJPATRA_SMALL_12: ["SSBP001012"],
    BHOJPATRA_SMALL_3: ["SSBP002003", "SSBP001003"],
    BHOJPATRA_SMALL_5: [
      "SSBP003005",
      "SSBP003002",
      "SSBP002002",
      "SSBP002005",
      "SSBP001005",
    ],
    BLACK_KAUDI_11_PCS: ["SSBK004011", "SSBK001011", "SSK003002", "SSBK003011"],
    CAMPHOR_100GM: ["SSBC001100"],
    CHANDAN_PASTE_1_PC: ["SSCP001002"],
    CHANDAN_PASTE_2_PC: ["SSACP001001"],
    CHANDAN_POWDER_125GM: [
      "SSAC003125",
      "SSAC001125",
      "SSAC004125",
      "SSAC002125",
    ],
    CHANDAN_POWDER_250GM: ["SSSC001500", "SSAC001250"],
    CHANDAN_POWDER_500GM: ["SSAC002500", "SSAC001500", "JMGAC001500"],
    CHANDAN_POWDER_60GM: ["SSAC001060"],
    EKANSH_NARIYAL_2_PCS: ["SSEN001002"],
    FLAG_LARGE: ["SSHF001002"],
    FLAG_MEDIUM: ["SSHF001001"],
    FLAG_SMALL: ["SSHF001003"],
    GOMTI_CHAKRA_108_PCS: ["SSGC001108"],
    GOMTI_CHAKRA_11_PCS: ["SSGC001011", "SSGC002011", "SSGC003011"],
    GOMTI_CHAKRA_21_PCS: ["SSGC002021", "SSGC003021", "SSGC001021"],
    GOMTI_CHAKRA_30_PCS: ["SSGC001030"],
    GOMTI_CHAKRA_5_PCS: ["SSGC004005"],
    GOMTI_CHAKRA_51PCS: ["SSGC001051"],
    HARCOG_KUBER_3IN: ["SSKY001003"],
    HAWAN_SAMAGRI_400GM: ["SSHS001400"],
    HORSE_NAIL: [
      "SSGN001003",
      "SSGN001001",
      "SSGN001002",
      "SSHS002002",
      "SSHS001002",
    ],
    KAMAL_GATTA_MALA: ["SSKG001108", "SSKG002108", "SSKM001001"],
    KAMAL_GATTA_SEED_50PCS: ["SSKG002001"],
    SHREE_YANTRA_6IN: ["SSGY001002"],
    TULSI_MALA: ["SSTM001002", "SSBM001001", "SSTM001001"],
    WHITE_KAUDI: ["SSK005001", "SSK001002"],
    SPATHIK_YANTRA: ["SSSSY001003", "SSSSY002003"],
    RUDRAKSHA_MALA: ["SSRM001001"],
    MERU_SHREE_YANTRA: ["SSSY003001"],
    BHOG_THALI: ["SSPS002005", "SSPS001005", "SSPT002001"],
    FRAMED_YANTRA: [
      "SSSSY001001",
      "SSKY002002",
      "SSSH001002",
      "SSKY002001",
      "SSSSY003001",
      "SSSV002002",
    ],
    CHOPAD: [
      "SSCM004001",
      "SSRC001004",
      "SSCR002400",
      "SSCM003001",
      "SSCM005001",
      "SSCM006001",
    ],
    ADIYOGI_STATUE: [
      "SSAY002001",
      "SSAY007001",
      "SSAY003001",
      "SSAY005001",
      "SSAY001001",
    ],
    LOTA: ["SSTS001001", "SSPPT001001"],
    SHREE_PHAL: ["SSLN001011"],
    YANTRA_9IN: ["SSKY006001"],
  };

  // Get the list of all product groups
  static getProductGroupList(): string[] {
    return Object.keys(this.items);
  }

  // Get SKUs for a specific product group
  static getSKUsByProductGroup(group: string): string[] | undefined {
    return this.items[group];
  }

  // Get all SKUs for all product groups
  static getAllSKUs(): string[] {
    return Object.values(this.items).flat();
  }

  // Get the product group for a specific SKU
  static getProductGroupBySKU(sku: string): string | undefined {
    for (const group in this.items) {
      if (this.items[group].includes(sku)) {
        return group;
      }
    }
    return undefined; // Returns undefined if SKU is not found in any group
  }
}
