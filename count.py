accounts = [{"accountId":"a"},{"accountId":"b"}]
contracts = [{'contractId':"1","accountId":"a"},{"contractId":"2","accountId":"a"}]

contract_count = dict([
        [
                    accountId,
                            sum([contract.get('accountId')==accountId for contract in contracts ])
                                ]
            for accountId in set([account.get('accountId') for account in accounts])
            ])

accounts = [{**account,'count':contract_count.get( account.get('accountId',0) ) } for account in accounts]

print( accounts) 
