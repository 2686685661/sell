<template>
    <div class="loanDetail">
        <dl>
            <dt>产品要点</dt>
            <dd>
                <template v-for="item in data.points">
                    <p>
                        {{ item.tit }}
                        <span class="fr">{{ item.con }}</span>
                    </p>
                </template>
            </dd>
        </dl>
        <dl>
            <dt>需要资料</dt>
            <dd>
                <p v-html='data.data'></p>
            </dd>
        </dl>
        <dl class="hasIcon" :class="{down:showFeatrue}">
            <dt @click="showFeatrue = !showFeatrue">产品特点</dt>
            <dd v-show="showFeatrue">
                <p v-html="data.feature"></p>
            </dd>
        </dl>
        <dl class="hasIcon" :class="{down:showTips,hot:hasHot}">
            <dt @click="toggleTips">好借好还，再借不难</dt>
            <dd v-show="showTips">
                <p v-html="data.tips"></p>
            </dd>
        </dl>
        <div class="btnWarp btn-float">
            <slot name="apply"></slot>
        </div>
    </div>
</template>

<script type="application/ecmascript">
    import detailData from '../../data/loan_detail.json'
    export  default {
        data: function () {
            return {
                data:{},
                showFeatrue:false,
                showTips:false,
                hasHot:true
            }
        },
        props: ['uid'],
        methods: {
            toggleTips:function () {
                this.showTips = !this.showTips;
                if(this.hasHot == true) {
                    this.hasHot = !this.hasHot;
                    this.$store.commit('changeLoanIconStatu',{name:this.uid,val:true});
                }
            }
        },
        mounted:function () {
            this.data = detailData[this.uid];
            var aa = this.$store.state.loanIcons[this.uid];
            if(aa) {
                this.hasHot = false;
            }
        }
    }
</script>
<style>

</style>
