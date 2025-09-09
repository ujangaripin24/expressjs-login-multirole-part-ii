import * as userService from '../../service/user.service.js';
import db from '../../models/index.js';
import argon2 from 'argon2';

jest.mock('../models/index.js', () => ({
  TblUser: {
    findAndCountAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('argon2', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword123'),
}));

const { TblUser } = db;

describe("User Service", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("handle error jika user tidak ditemukan", async () => {
    TblUser.findOne.mockResolvedValue(null);

    await expect(userService.getUserByID("uuid-123"))
      .rejects
      .toThrow("User Tidak ada");
  });

  test("harus membuat user baru dengan password di-hash", async () => {
    TblUser.create.mockResolvedValue({ name: "Ujang", email: "test@mail.com" });

    const result = await userService.createUser({
      name: "Ujang",
      email: "test@mail.com",
      password: "123456",
      role: "user",
      type: "local"
    });

    expect(argon2.hash).toHaveBeenCalledWith("123456");
    expect(result).toEqual({ name: "Ujang", email: "test@mail.com" });
  });

  test("GetAllUser harus mengembalikan data dengan pagination", async () => {
    TblUser.findAndCountAll.mockResolvedValue({
      rows: [{ name: "Ujang", email: "test@mail.com" }],
      count: 1,
    });

    const result = await userService.GetAllUser({ page: 1, size: 10, search: "" });

    expect(result.data).toHaveLength(1);
    expect(result.totalPage).toBe(1);
    expect(result.totalData).toBe(1);
    expect(TblUser.findAndCountAll).toHaveBeenCalled();
  });

  test("updateUser harus update user yang ada", async () => {
    const mockUser = {
      uuid: "uuid-1",
      name: "Old Name",
      email: "old@mail.com",
      role: "user",
      type: "local",
      link_picture: "old.png",
      save: jest.fn().mockResolvedValue(true),
    };

    TblUser.findOne.mockResolvedValue(mockUser);

    const payload = { name: "New Name", email: "new@mail.com" };
    const result = await userService.updateUser("uuid-1", payload);

    expect(mockUser.name).toBe("New Name");
    expect(mockUser.email).toBe("new@mail.com");
    expect(mockUser.save).toHaveBeenCalled();
    expect(result).toBe(mockUser);
  });

  test("updateUser harus error jika user tidak ditemukan", async () => {
    TblUser.findOne.mockResolvedValue(null);

    await expect(userService.updateUser("uuid-404", {}))
      .rejects
      .toThrow("User Tidak ada");
  });

  test("deleteUser harus hapus user yang ada", async () => {
    const mockUser = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    TblUser.findOne.mockResolvedValue(mockUser);

    const result = await userService.deleteUser("uuid-1");

    expect(mockUser.destroy).toHaveBeenCalled();
    expect(result).toBe(mockUser);
  });

  test("deleteUser harus error jika user tidak ditemukan", async () => {
    TblUser.findOne.mockResolvedValue(null);

    await expect(userService.deleteUser("uuid-404"))
      .rejects
      .toThrow("User Tidak ada");
  });

});
