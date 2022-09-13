# メモ

# total 

# ２４時間以内の増 ---------------------------------------------------------------------------------------------------------------
# パターン１:金融口座のとき--------------------------------------------------------------------------------------------------------
finance_asseta_24h = [finance_asset async for finance_asset in db["musubi-db"]["finance_asset"].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(hours=24)}, "balance": {"$ne": None}},
    projection = {"_id": 0, "createdAt": 1, "contractorAccountId": 1, "balance": 1},
    sort = [("createdAt", -1)]
)]
finance_asseta_24h_balance = {fa2b.get("balance") for fa2b in finance_asseta_24h}
total_asseta_24h = sum(finance_asseta_24h_balance)
# パターン２:保険、不動産、書類、証券のとき-------------------------------------------------------------------------------------------
foldera_24h = [folder async for folder in db["musubi-db"]["folder"].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(hours=48), "$lt":d1 - timedelta(hours=24)}, "folderName": "保険"},
    projection = {"_id": 0, "createdAt": 1, "folderName": 1, "folderId": 1},
    sort = [("createdAt", -1)]
)]
memory_asseta_24h = [memory_asset async for memory_asset in db["musubi-db"]["memory_asset"].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(hours=24)}, "balance": {"$ne": None}},
    projection ={"_id": 0, "createdAt": 1, "folderId": 1, "balance": 1},
    sort = [("createdAt", -1)]
)]
foldera_24h_folderId = {f2f.get("folderId") for f2f in foldera_24h}
memory_asseta_24h_balance = {ma2b.get('balance') for ma2b in memory_asseta_24h if ma2b.get('folderId') in foldera_24h_folderId}
total_asseta_24h = sum(memory_asseta_24h_balance)
# パターン３:トータルのとき--------------------------------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------------------------------------
finance_asseta_24h = [finance_asset async for finance_asset in db["musubi-db"][finance_asset].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(hours=24)}, "balance": {"$ne": None}},
    projection = {"_id": 0, "createdAt": 1, "contractorAccountId": 1, "balance": 1},
    sort = [("createdAt", -1)]
)]
finance_asseta_24h_balance = {fa2b.get("balance") for fa2b in finance_asseta_24h}
# -----------------------------------------------------------------------------------------------------------------------------
foldera_24h = [folder async for folder in db["musubi-db"]["folder"].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(hours=24)}, "folderName": "保険"},
    projection = {"_id": 0, "createdAt": 1, "folderName": 1, "folderId": 1},
    sort = [("createdAt", -1)]
)]
memory_asseta_24h = [memory_asset async for memory_asset in db["musubi-db"][x_3].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(hours=24)}, "balance": {"$ne": None}},
    projection ={"_id": 0, "createdAt": 1, "folderId": 1, "balance": 1},
    sort = [("createdAt", -1)]
)]
foldera_24h_folderId = {f2f.get("folderId") for f2f in foldera_24h}
memory_asseta_24h_balance = {ma2b.get('balance') for ma2b in memory_asseta_24h if ma2b.get('folderId') in foldera_24h_folderId}
# -----------------------------------------------------------------------------------------------------------------------------
total_asseta_24h = sum(finance_asseta_24h_balance) + sum(memory_asseta_24h_balance)
# -----------------------------------------------------------------------------------------------------------------------------

# ２４時間以内の前比--------------------------------------------------------------------------------------------------------------
# パターン１:金融口座のとき--------------------------------------------------------------------------------------------------------
finance_assetb_24h = [finance_asset async for finance_asset in db["musubi-db"]["finance_asset"].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(hours=24)}, "balance": {"$ne": None}},
    projection = {"_id": 0, "createdAt": 1, "contractorAccountId": 1, "balance": 1},
    sort = [("createdAt", -1)]
)]
finance_assetb_24h_balance = {fa2b.get("balance") for fa2b in finance_assetb_24h}
total_assetb_24h = sum(finance_assetb_24h_balance)
# -------------------------------------------------------------------------------------------------------------------------------------

# ７日以内の増---------------------------------------------------------------------------------------------------------------------------
accounta_7d = [account async for account in db["musubi-db"]["account"].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(days=7)}, **input_filter},
    projection = {"_id": 0, "accountId": 1, "userLoginKey": 1, "createdAt": 1},
    sort = [("createdAt", -1)]
)]
loga_7d = [log async for log in db["musubi-db"][x]. find(
    filter = {**input_filter_2, 'createdAt':{"$gt":d1 - timedelta(days=7)}, "balance": {"$ne": None}},
    projection = {**input_projection_2},
    sort = [("createdAt", -1)]
)]
aida_7d = {acc.get('accountId') for acc in accounta_7d}
bala_7d = {fas.get('balance') for fas in loga_7d if fas.get('accountId') in aida_7d}
total_asseta_7d = sum(bala_7d
# ７日以内の前比
accountb_7d = [account async for account in db["musubi-db"]["account"].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(days=14),"$lt":d1 - timedelta(days=7)}, **input_filter},
    projection = {"_id": 0, "accountId": 1, "userLoginKey": 1, "createdAt": 1},
    sort = [("createdAt", -1)]
)]
logb_7d = [log async for log in db["musubi-db"][x]. find(
    filter = {**input_filter_2, 'createdAt':{"$gt":d1 - timedelta(days=14),"$lt":d1 - timedelta(days=7)}, "balance": {"$ne": None}},
    projection = {**input_projection_2},
    sort = [("createdAt", -1)]
)]
aidb_7d = {acc.get('accountId') for acc in accountb_7d}
balb_7d = {fas.get('balance') for fas in logb_7d if fas.get('accountId') in aidb_7d}
total_assetb_7d = sum(balb_7d
# ３０日以内の増
accounta_30d = [account async for account in db["musubi-db"]["account"].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(days=30)}, **input_filter},
    projection = {"_id": 0, "accountId": 1, "userLoginKey": 1, "createdAt": 1},
    sort = [("createdAt", -1)]
)]
loga_30d = [log async for log in db["musubi-db"][x]. find(
    filter = {**input_filter_2, 'createdAt':{"$gt":d1 - timedelta(days=30)}, "balance": {"$ne": None}},
    projection = {**input_projection_2},
    sort = [("createdAt", -1)]
)]
aida_30d = {acc.get('accountId') for acc in accounta_30d}
bala_30d = {fas.get('balance') for fas in loga_30d if fas.get('accountId') in aida_30d}
total_asseta_30d = sum(bala_30d
# ３０日以内の前比
accountb_30d = [account async for account in db["musubi-db"]["account"].find(
    filter = {'createdAt':{"$gt":d1 - timedelta(days=60),"$lt":d1 - timedelta(days=30)}, **input_filter},
    projection = {"_id": 0, "accountId": 1, "userLoginKey": 1, "createdAt": 1},
    sort = [("createdAt", -1)]
)]
logb_30d = [log async for log in db["musubi-db"][x]. find(
    filter = {**input_filter_2, 'createdAt':{"$gt":d1 - timedelta(days=60),"$lt":d1 - timedelta(days=30)}, "balance": {"$ne": None}},
    projection = {**input_projection_2},
    sort = [("createdAt", -1)]
)]
aidb_30d = {acc.get('accountId') for acc in accountb_30d}
balb_30d = {fas.get('balance') for fas in logb_30d if fas.get('contractorAccountId') in aidb_30d}
total_assetb_30d = sum(balb_30d

return {
    "total": v,
    "increase_every_24hours": total_asseta_24h,
    "comparison_every_24hours": total_assetb_24h,
    "increase_every_7days": total_asseta_7d,
    "Comparison_every_7days": total_assetb_7d,
    "increase_every_30days": total_asseta_30d,
    "comparison_every_30days": total_assetb_30d
}

if includeTestAccount:
            input_filter = {}
        else:
            input_filter = {"userLoginKey": {"$not": {"$regex": "^777"}}}
# 総合合計数
        accounts = [account async for account in db["musubi-db"]["account"].find(
            filter = {'createdAt':{"$lt": d1}, **input_filter},
            projection = {"_id": 0, "accountId": 1, "userLoginKey": 1, "createdAt": 1},
            sort = [("createdAt", -1)]
        )]
        logs = [log async for log in db["musubi-db"][x].find(
            filter = {**input_filter_2, 'createdAt':{"$lt": d1}, "balance": {"$ne": None}},
            projection = {**input_projection_2},
            sort = [("createdAt", -1)]
        )]
        aid = {acc.get('accountId') for acc in accounts}
        bal = {fas.get('balance') for fas in logs if fas.get('accountId') in aid}
        total_assets = sum(bal)

        folders = [folder async for folder in db["musubi-db"][x_2].find(
            filter = {**filter_1},
            projection = {"_id": 0, "createdAt": 1, "folderName": 1, "folderId": 1},
            sort = [("createdAt", -1)]
        )]
        memory_assets = [memory_asset async for memory_asset in db["musubi-db"][x_3].find(
            filter = {'createdAt':{"$lt": d1}, "balance": {"$ne": None}},
            projection ={"_id": 0, "createdAt": 1, "folderId": 1, "balance": 1},
            sort = [("createdAt", -1)]
        )]
        mix = {fol.get("folderId") for fol in folders}
        mix_2 = {mem.get('balance') for mem in memory_assets if mem.get('folderId') in mix}
        total_mix_2 = sum(mix_2)

        # account
        accounts = [account async for account in db["musubi-db"]["account"].find(
            filter = {'createdAt':{"$lt": d1}, **input_filter},
            projection = {"_id": 0, "accountId": 1, "userLoginKey": 1, "createdAt": 1},
            sort = [("createdAt", -1)]
        )]

        # finance_asset
        finance_assets = [finance_asset async for finance_asset in db["musubi-db"]["finance_asset"].find(
            filter = {'createdAt':{"$lt": d1}, "balance": {"$ne": None}},
            projection = {"_id": 0, "balance": 1, "createdAt": 1, "contractorAccountId": 1},
            sort = [("createdAt", -1)]
        )]

        # memory
        memory_assets = [memory_asset async for memory_asset in db["musubi-db"][x_3].find(
            filter = {**filter_a_1},
            projection ={"_id": 0, "createdAt": 1, "folderId": 1, "balance": 1, "contractorAccountId": 1},
            sort = [("createdAt", -1)]
        )]

        # function
        m = {l.get('accountId') for l in accounts}
        i = {y.get('balance') for y in memory_assets if y.get('contractorAccountId') in m}
        k = {c.get('balance') for c in finance_assets if c.get('contractorAccountId') in m}

        v = sum(i) + sum(k)