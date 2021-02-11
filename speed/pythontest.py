# """calculem la nota mitjana dels alumnes"""
joan = 8.3
carla = 9.2
adria = 7.5
dolors = 6.9
suma_notes = joan + carla + adria + dolors
n_alumnes = 4
mitjana = suma_notes / n_alumnes
print(mitjana)

# PRIMER EJERCICIO

first = 356.75
second = 487.45
third = 295.83
forth = 532.00

change = float(input("Exchange rate $ to €: "))

first_euros = first*change
second_euros = second*change
third_euros = third*change
forth_euros = forth*change

total_euros = first_euros + second_euros + third_euros + forth_euros
ALTERNATIVE #
forth_euros = forth_euros * 0.8
total_euros = first_euros + second_euros + third_euros + forth_euros
mean_euros = total_euros/4

print('Total d\'euros:' , total_euros)
print('Mitjana d\'euros:',  mean_euros)

# SEGUNDO EJERCICIO

compra = { 'pomes' : 3.56,'mandarines': 4.35, 'sindria': 6.23, 'maduixes': 4.28, 'peres': 2.86, 'taronges': 3.48}

valors = list(compra.values())
mitjana = sum(valors)/len(valors)

print('La mitjana de la compra es {:.2f}'.format(mitjana))

nous_valors = valors[:-2]
print(nous_valors)

print('llimones' in list(compra.keys()))

# TERCER EJERCICIO

lista = []
lista = input("Introdueix 10 números: ")
lista = list(map(int,lista.split(" ")))

for i in range(0,len(lista)):
    if lista[i] < 10:
        lista[i]=lista[i]*3
    else:
        lista[i]=lista[i]*2
print(lista)

n=0
while n<5:
    print(lista[n])
    n = n+1

# CUARTO EJERCICIO

llista =[4,6,8]

def doblar(lista):
    for i in range(len(lista)):
        lista[i] = lista[i]*2
    return new_list

def second_function(lista):
    for i in range(len(lista)):
        if lista[i] <= 10:
            lista[i] = lista[i]*3
    print(new_list2)
    return new_list2

print(doblar(llista))
second_function(doblar(llista))

def funcio(x,y,z):

   x = 2 + x

   y = 3 + z

   z = x + z

   print(x,y,z)

funcio(3,4,5)     