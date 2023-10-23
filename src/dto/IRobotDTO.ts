export default interface IRobotDTO {
    domainId: string;
    identification: string;
    nickname: string;
    robotType: {
        id: string;
        name: string;
    };
    serialNumber: string;
    description: string;
    state: boolean;
}
