export abstract class Role {

    private roleCode: number;

    private roleName: string;

    constructor(roleCode: number, roleName: string) {
        this.roleCode = roleCode;
        this.roleName = roleName;
    }

    public abstract action(io:any, callback:(any)=>void);

    public abstract deadWords();

}

