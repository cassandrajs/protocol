import { HashObject } from "../../util/HashObject";
export class ColumnSpec {
    ksName;
    tableName;
    name;
    index;
    type;
    constructor(ksName, tableName, name, index, type) {
        this.ksName = ksName;
        this.tableName = tableName;
        this.name = name;
        this.index = index;
        this.type = type;
    }
    equals(other) {
        if (other === this) {
            return true;
        }
        else if (other instanceof ColumnSpec) {
            const that = other;
            return (this.ksName === that.ksName &&
                this.tableName === that.tableName &&
                this.name === that.name &&
                this.type === that.type);
        }
        else {
            return false;
        }
    }
    hashCode() {
        return (HashObject(this.ksName) ^
            HashObject(this.tableName) ^
            HashObject(this.name) ^
            this.type.hashCode());
    }
}
