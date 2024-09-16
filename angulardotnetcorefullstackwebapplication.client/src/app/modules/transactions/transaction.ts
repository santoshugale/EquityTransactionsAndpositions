export interface Transaction {
    transactionID: number;
    tradeID: number;
    version: number;
    securityCode: string;
    quantity: number;
    tradeType: string;
    tradeAction: string;
}
