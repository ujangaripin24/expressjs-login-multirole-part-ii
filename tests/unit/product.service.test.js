import * as productService from '../../service/product.service.js'
import db from '../../models/index.js'

jest.mock('../models/index.js', () => ({
    TblProduct: {
        findAndCountAll: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn(),
    }
}))
const { TblProduct } = db;

describe("Product Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    test("mengambil semua produk dengan pagination", async () => {
        TblProduct.findAndCountAll.mockResolvedValue({
            rows: [
                { id: 1, name: "Product A", link_picture: "a.jpg", price: 1000 },
                { id: 2, name: "Product B", link_picture: "b.jpg", price: 2000 }
            ],
            count: 2
        });

        const result = await productService.getAllProduct({ page: 1, size: 2, search: "" });

        expect(TblProduct.findAndCountAll).toHaveBeenCalled();
    });

    test("admin bisa ambil semua produk", async () => {
        TblProduct.findAll.mockResolvedValue([{ name: "admin product" }]);

        const result = await productService.getProduct("admin", 1)
        expect(result).toEqual([{ name: "admin product" }])

    })

    test("user hanya bisa mengambil produk miliknya", async () => {
        TblProduct.findAll.mockResolvedValue([{ name: "User Product" }]);

        const result = await productService.getProduct("user", 99);

        expect(TblProduct.findAll).toHaveBeenCalledWith(
            expect.objectContaining({ where: { userId: 99 } })
        );
        expect(result).toEqual([{ name: "User Product" }]);
    });

    test("throw error jika produk tidak ditemukan", async () => {
        TblProduct.findOne.mockResolvedValue(null);

        await expect(productService.getProductById("uuid-123", "admin", 1))
            .rejects
            .toThrow("Product Tidak ada");
    });

    test("admin bisa ambil produk by id", async () => {
        TblProduct.findOne
            .mockResolvedValueOnce({ uuid: "uuid-1" })
            .mockResolvedValueOnce({ uuid: "uuid-1", name: "Admin Product" });

        const result = await productService.getProductById("uuid-1", "admin", 1);

        expect(result).toEqual({ uuid: "uuid-1", name: "Admin Product" });
    });

    test("user hanya bisa ambil produknya sendiri", async () => {
        TblProduct.findOne
            .mockResolvedValueOnce({ uuid: "uuid-1", userId: 10 })
            .mockResolvedValueOnce({ uuid: "uuid-1", name: "User Product", userId: 10 });

        const result = await productService.getProductById("uuid-1", "user", 10);

        expect(result.name).toBe("User Product");
    });
    test("membuat produk baru", async () => {
        TblProduct.create.mockResolvedValue({
            name: "Product",
            link_picture: "www.google.com/picture",
            price: 5000,
            userId: 58
        });

        const result = await productService.createProduct(
            58,
            {
                name: "Product",
                link_picture: "www.google.com/picture",
                price: 5000
            }
        );

        expect(result).toEqual({
            name: "Product",
            link_picture: "www.google.com/picture",
            price: 5000,
            userId: 58
        });
    });
    test("updateProduct gagal jika produk tidak ada", async () => {
        TblProduct.findOne.mockResolvedValue(null);

        await expect(productService.updateProduct("uuid-1", "admin", 1, {}))
            .rejects
            .toThrow("User Tidak ada");
    });
    test("admin bisa update produk", async () => {
        const mockProduct = {
            uuid: "uuid-1",
            update: jest.fn().mockResolvedValue(true)
        };
        TblProduct.findOne.mockResolvedValue(mockProduct);

        const result = await productService.updateProduct("uuid-1", "admin", 1, { name: "Updated" });

        expect(mockProduct.update).toHaveBeenCalledWith({ name: "Updated" }, expect.anything());
        expect(result).toBe(mockProduct);
    });
    test("user tidak bisa update produk milik orang lain", async () => {
        const mockProduct = { uuid: "uuid-1", userId: 99 };
        TblProduct.findOne.mockResolvedValue(mockProduct);

        await expect(productService.updateProduct("uuid-1", "user", 100, {}))
            .rejects
            .toThrow("Akses terlarang");
    });
    test("deleteProduct gagal jika produk tidak ada", async () => {
        TblProduct.findOne.mockResolvedValue(null);

        await expect(productService.deleteProduct("uuid-1", "admin", 1))
            .rejects
            .toThrow("User Tidak ada");
    });
    test("admin bisa hapus produk", async () => {
        const mockProduct = { uuid: "uuid-1", destroy: jest.fn().mockResolvedValue(true) };
        TblProduct.findOne.mockResolvedValue(mockProduct);

        const result = await productService.deleteProduct("uuid-1", "admin", 1);

        expect(mockProduct.destroy).toHaveBeenCalled();
        expect(result).toBe(mockProduct);
    });
    test("user tidak bisa hapus produk milik orang lain", async () => {
        const mockProduct = { uuid: "uuid-1", userId: 99 };
        TblProduct.findOne.mockResolvedValue(mockProduct);

        await expect(productService.deleteProduct("uuid-1", "user", 100))
            .rejects
            .toThrow("Akses terlarang");
    });
})