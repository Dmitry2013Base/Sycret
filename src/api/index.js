const key = '';
const host = 'https://sycret.ru/service/api/api';

export const getCertificates = async () => {
    try {
        var response = await fetch(`${host}?MethodName=OSGetGoodList&ismob=0&ApiKey=${key}`);
        var { data } = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        return [];
    }
};

export const SaveCertificate = async (selectCertificate, user) => {
    try {
        let params = [
            'MethodName=OSSale',
            `ApiKey=${key}`,
            `Id=${selectCertificate.ID}`,
            `TableName=${selectCertificate.TABLENAME}`,
            `PrimaryKey=${selectCertificate.PRIMARYKEY}`,
            `Price=${selectCertificate.PRICE}`,
            `Summa=${selectCertificate.SUMMA}`,
            `ClientName=${user.name}`,
            `Phone=${user.phone}`,
            `Email=${user.email}`,
            `PaymentTypeId=2`,
            `UseDelivery=0`,
        ];
        let response = await fetch(`${host}?${params.join('&')}`);
        let { data } = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
