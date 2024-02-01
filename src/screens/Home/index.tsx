import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View, FlatList } from 'react-native';

import { styles } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Product } from '../../components/Product';
import { dataSource } from '../../database';
import { ProductEntity } from '../../database/entities/ProductEntity';

export function Home() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState<ProductEntity[]>([]);

  async function handleRemoveItem(product: ProductEntity) {
    Alert.alert(
      'Remover',
      `Remover produto ${product.name}?`,
      [
        {text: 'Nào', style: 'cancel'},
        {text: 'Sim', onPress: async () => {
          await dataSource.manager.remove(product)
          loadProducts()
        }}
      ]
    )
  }

  async function loadProducts() {
    const productRepository = dataSource.getRepository(ProductEntity)
    const products = await productRepository.find()
    setProducts(products)
    setName('')
    setQuantity('')
  }

  async function handleAdd() {
    if(!name.trim() || !quantity.trim()) return Alert.alert('Informe o produto e a quantidade!')

    const product = new ProductEntity()
    product.name = name
    product.quantity = Number(quantity)

    await dataSource.manager.save(product)

    Alert.alert('Produto salvo', `Produto ${product.id} cadastrado com sucesso!`)
    loadProducts()
  }
  
  useEffect(() => {
    const connect = async () => {
      if(!dataSource.isInitialized) {
        await dataSource.initialize()
        loadProducts()
      }
    }

    connect()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Liste de compras
      </Text>

      <Input
        placeholder="Nome do item"
        onChangeText={setName}
        value={name}
      />

      <Input
        placeholder="Quantidade"
        keyboardType="numeric"
        onChangeText={setQuantity}
        value={quantity}
      />

      <Button
        onPress={handleAdd}
        title="Adicionar"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Itens</Text>
        <Text style={styles.headerQuantity}> {products.length} </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <Product key={item.id} name={item.name} quantity={item.quantity} onRemove={() => handleRemoveItem(item)} />
          )}
       />

      {/* <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.items}
        showsVerticalScrollIndicator={false}
      >
        <Product
          name="Produto A"
          quantity={3}
          onRemove={() => Alert.alert('Remove', 'Text Removed')}
        />
        <Product
          name="Produto B"
          quantity={2}
          onRemove={() => { }}
        />
      </ScrollView> */}
    </View>
  );
}