from rest_framework import serializers
from groceryApp.models import Order, Product, ProductOrder

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductOrderSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        many = kwargs.pop('many', True)
        super(ProductOrderSerializer, self).__init__(many=many, *args, **kwargs)
        
    class Meta:
        model = ProductOrder
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
