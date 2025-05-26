import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import Notification

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        if not self.user.is_authenticated or str(self.user.id) != self.user_id:
            await self.close()
            return
        self.group_name = f'user_{self.user_id}_notifications'
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        # Optionally handle client messages (e.g., mark as read)
        pass

    async def send_notification(self, event):
        await self.send(text_data=json.dumps(event['notification']))

    @database_sync_to_async
    def get_unread_notifications(self):
        return list(Notification.objects.filter(user_id=self.user_id, read=False).values()) 