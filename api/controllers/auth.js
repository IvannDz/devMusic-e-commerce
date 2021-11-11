const { User } = require("../models");

class AuthController {
    //"/me"
    static async getUser(req, res) {
        res.send(req.user)
    }

    //"/login"
    static async login(req, res) {
        res.send(req.user)
    }

    //"/register"
    static async register(req, res) {
        console.log("SOY EL REQ", req.body)
        try {
            const user = await User.create(req.body)
            console.log("SOY EL USER", user)
            res.send(user)

        }
        catch { res.sendStatus(500) }

    }

    //"/me"
    static async updateUser(req, res) {
        const user = await User.update(req.body, {
            where: {
                id: req.user.id
            },
            returning: true
        })
        res.status(200).send(user)
    }

    //"/:id"
    static async deleteUser(req, res) {
        await User.destroy({
            where: {
                id: req.user.id
            }
        })
        req.logout()
        res.senStatus(204)
    }

    //"/logout"
    static async logout(req, res) {
        req.logout()
        res.sendStatus(204)
    }



}

module.exports = AuthController;