# building a class hierarchy

# определяем базовый класс
class A: # инструкция class является выполняемой, она инстанцирует объект класса и присваивает ему имя А, что тоже немаловажно
    def fA(self):
        return 0

# определяем подкласс
class B(A):
    def __init__(self): # это не что иное как конструктор!
        self.name = "B Class instance"  # который определяет поле и инициализирует его значением
        # если мы не опрределим поле тут, то никто не гарантирует что объект экземпляра будет его иметь!

    def fB(self):
        return 0

a = A() # инстанцируется объект экземпляра класса
b = B()
b.attr = "attribute value"

# таким образом, важно не путать "объект класса" и "объект экземпляра класса"

print(b.attr)

# по сути все методы классов являются статическими, если сравнивать с С#, мы просто передаём об'ект контекста в параметр self (полный аналог this)
A.fA(A()) # это странное выражение вызывает "статический" метод класса и передаёт ему новый экземпляр того же класса в качестве self

input()
