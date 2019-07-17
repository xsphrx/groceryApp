from groceryApp.models import Product, ProductOrder, Order
from rest_framework import viewsets, permissions, status
from .serializers import ProductSerializer, ProductOrderSerializer, OrderSerializer
from rest_framework.response import Response

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProductSerializer


class ProductOrderSerializer(viewsets.ModelViewSet):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
    queryset = ProductOrder.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ProductOrderSerializer



class OrderSerializer(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = OrderSerializer
