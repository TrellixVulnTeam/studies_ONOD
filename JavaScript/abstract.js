function inherit(p)
{
    if (p === null){
        throw new TypeError('cannot inherit null');
    }
    if (Object.create){
        return Object.create(p);
    }
    var t = typeof p;
        if (t !== 'object' && t !== 'function'){
            throw TypeError();
        }
        function f(){}
        f.prototype = p;
        return new f();
}

// ������� ������� ��� �������� ������� ����������
function defineSubclass(superclass, // ����������� ����������� 
    constructor, // ����������� ������ ���������
    methods, // ������ �������.: ���������� � ��������
    statics) // �������� ������: ���������� � ������-�
{
    // ���������� ������- �������� ��������� 
    constructor.prototype = inherit(superclass.prototype);
    constructor.prototype.constructor = constructor;
    // ����������� ������ methods � statics, ��� � ������ � �������� ��������
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    // ������� �����
    return constructor;
}

// �� �� ����� ����� ����������� � ���� ������ ������������ �����������
Function.prototype.extend = function(constructor, methods, statics) {
    return defineSubclass(this, constructor, methods, statics);
};

// ==========================================

// ��������������� �������, ������� ����� �������������� ��� �����������
// ������ ������������ ������ 
function abstractmethod() { 
    throw new Error("����������� �����");
}

/*
* ����� AbstractSet ���������� ������������ ����������� �����, contains().
*/
function AbstractSet() {
    throw new Error("������ ������� ��������� ������������ ������");
}
AbstractSet.prototype.contains = abstractmethod;

/*
* NotSet - ���������� �������� ������ AbstractSet.
* ���������� ����� ��������� �������� ��� ��������, ������� �� �������� 
* ���������� ���������� ������� ���������. ��������� ��� ���������
* ������������ � �������� ������� ���������, ��� �� �������� ��� ������, 
* � ��� ��� ��� ����� ����������� ����� ���������, ��� ���������� ��� ������������.
* ���, ��� ��������� ���� �����, - ��� ��������� �������������� � ���������.
* �������� ��������, ��� ��� ����������� ����� ��������� ������������ �����
* Function.prototype.extend(), ����������� ����.
*/
var NotSet = AbstractSet.extend(
    function NotSet(set) { 
        this.set = set; 
    },
    {
        contains: function(x) { return !this.set.contains(x); },
        toString: function(x) { return "~" + this.set.toString(); },
        equals: function(that) {
            return that instanceof NotSet && this.set.equals(that.set);
        }
    }
);

/*
* AbstractEnumerableSet - ����������� �������� ������ AbstractSet.
* ���������� ����������� ������ size() � foreach() � ��������� ����������
* ������ isEmpty(), toArray(), to[Locale]String() � equals().
* ���������, ����������� ������ contains(), size() � foreach(),
* �������� ��� ���� ���������� ������� �����.
*/

var AbstractEnumerableSet = AbstractSet.extend(
    function() {
        throw new Error("������ ������� ��������� ������������ ������");
    },
    
    {
        size: abstractmethod,
        foreach: abstractmethod,
        isEmpty: function() { 
            return this.size() === 0; 
        },
        
        toString: function() {
            var s = "{", i = 0;
            this.foreach(function(v) {
            if (i++ > 0) s += ", ";
            s += v;
        });
        return s + "}";
    },
    
    toLocaleString : function() {
        var s = "{", i = 0;
        this.foreach(function(v) {
            if (i++ > 0) s += ", ";
            if (v === null) s += v; // null � undefined
            else s += v.toLocaleString(); // ��� ���������
        });
        return s + "}";
    },
    
    toArray: function() {
        var a = [];
        this.foreach(function(v) {
            a.push(v); 
        });
        return a;
    },
    
    equals: function(that) {
        if (!(that instanceof AbstractEnumerableSet)) {
            return false;
        }
        // ����  ��������� that ����� ������ ������, ��������� �� �����
        if (this.size() != that.size()) {
            return false;
        }
        // ���������  ������� ������� �������� this � ��������� that.
        try {
            this.foreach(function(v){
                if (!that.contains(v)) {
                    throw false;
                }
            }
        );
        return true; // ��� �������� j���������: ��������� �����.
        } 
        catch (x) {
            if (x === false) return false; // ��������� �� �����
            throw x; // �������� ��������� ����� ���� ��������� ����������.
        }
    }
    });
    
/*
* SingletonSet - ���������� �������� ������ AbstractEnumerableSet. 
* ��������� �� ������������� ��������, ��������� ������ ��� ������.
*/

var SingletonSet = AbstractEnumerableSet.extend(
    function SingletonSet(member) { this.member = member; },
    {
        contains: function(x) { return x === this.member; },
        size: function() { return 1; },
        foreach: function(f,ctx) { f.call(ctx, this.member); }
    }
);

/*
* AbstractWritableSet - ����������� �������� ������ AbstractEnumerableSet.
* ���������� ����������� ������ add() � remove() � ��������� ����������
* ������ union(), intersection() � difference().
*/

var AbstractWritableSet = AbstractEnumerableSet.extend(
    function() {
        throw new Error("������ ������� ��������� ������������ ������");
    },
    {
        add: abstractmethod,
        remove: abstractmethod,
        union: function(that) {
            var self = this;
            that.foreach(function(v) { self.add(v); });
            return this;
    },
    intersection: function(that) {
        var self = this;
        this.foreach(function(v){ if(!that.contains(v)) self.remove(v);});
        return this;
    },
    difference: function(that) {
        var self = this;
        that.foreach(function(v) { self.remove(v); });
        return this;
    }
    });

/*
* ArraySet - ���������� �������� ������ AbstractWritableSet. 
* ������������ ��������� ��������� ��� ������ �������� � ��������� �������� 
* ����� � ������� � ����� ������ contains(). ��������� �������� ������ contains()
* ����� ��������� O(n) ������ O(1), ������ ����� ������� ������������ ������
* ��� �������� ������������ ��������� ��������. 
* �������� ��������, ��� ��� ���������� ��������� �� ������ ������ Array 
* indexOf() � forEach(), ������� ������������ ���������� ES5.
*/

var ArraySet = AbstractWritableSet.extend(
        function ArraySet() {
        this.values = [];
        this.add.apply(this, arguments);
    },
    {
        contains: function(v) { return this.values.indexOf(v) != -1; },
        size: function() { return this.values.length; },
        foreach: function(f,c) { this.values.forEach(f, c); },
        add: function() {
            for(var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!this.contains(arg)) this.values.push(arg);
        }
        return this;
    },
        remove: function() {
            for(var i = 0; i < arguments.length; i++) {
                var p = this.values.indexOf(arguments[i]);
                if (p == -1) continue;
                this.values.splice(p, 1);
            }
        return this;
        }
    }
);












