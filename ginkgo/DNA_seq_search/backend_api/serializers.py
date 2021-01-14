from rest_framework import serializers

from .models import Query, Result


class QuerySerializer(serializers.ModelSerializer):
    results = serializers.StringRelatedField(many=True)

    class Meta:
        fields = (
            'id',
            'query',
            'pub_date',
            'results'
        )
        model = Query


class ResultSerializer(serializers.ModelSerializer):

    class Meta:
        fields = (
            'id',
            'query',
            'sseqid',
            'sstart',
            'send'
        )
        model = Result

    def __str__(self):
        return '%d: %s' % (self.order, self.title)


