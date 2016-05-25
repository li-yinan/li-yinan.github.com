export const dataInherit = (obj) => {
    let FakeClass = function () {};
    FakeClass.prototype = obj;
    return new FakeClass();
}
