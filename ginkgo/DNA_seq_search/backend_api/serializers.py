from rest_framework import serializers

from .models import Query, Result


class QuerySerializer(serializers.ModelSerializer):
    results = serializers.StringRelatedField(many=True)

    class Meta:
        model = Query
        fields = (
            'id',
            'query',
            'results'
        )
        


class ResultSerializer(serializers.ModelSerializer):

    class Meta:
        model = Result
        fields = (
            'id',
            'query',
            'salltitles',
            'sseqid',
            'sstart',
            'send'
        )
        

    def __str__(self):
        return '%d: %s' % (self.order, self.title)


