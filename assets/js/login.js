$(function () {
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码应在6-16位且不包含空格'
        ],
        rePwd: function (value) {
            if (value !== $(".reg-box [name=password]").val())
                return '两次密码不一致'
        }
    })
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg(res.message)
                layer.msg(res.message)
                $("#link_login").click()
                $("#form_reg")[0].reset()
            }
        })
    })
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg(res.message)
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href='/index.html'
            }
        })
    })
})