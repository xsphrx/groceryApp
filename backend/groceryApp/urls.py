from rest_framework import routers
from .api import ProductViewSet, ProductOrderSerializer, OrderSerializer

router = routers.DefaultRouter()
router.register('api/products', ProductViewSet, 'products')
router.register('api/productOrder', ProductOrderSerializer, 'productOrders')
router.register('api/orders', OrderSerializer, 'orders')

urlpatterns = router.urls
